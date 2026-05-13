import dotenv from "dotenv";
import UserRepository from "./Repository";
import bcrypt from "bcrypt";
import { User } from "../../data/entities/User";
import jwt from "jsonwebtoken";
import { generateFingerPrint } from "../../util/helper/fingerPrint";
import crypto from "crypto";
import { UserReset } from "../../data/entities/UserReset";

dotenv.config({ quiet: true });

export default class UserService {
  private Repository = new UserRepository();

  async loginUser(email: string, password: string): Promise<{ jwt: string; id: number }> {
    this.checkRegexEmail(email);
    this.isPasswordValid(password);
    const user = await this.getUserByEmail(email);
    const jwt = await this.validateLogin(password, user);
    return { jwt: jwt, id: user.id };
  }

  async assignLogin(id: number, userAgent: string, ip: string, acceptLang: string, remeber: boolean) {
    const { fingerBrowser, fingerIp } = generateFingerPrint(userAgent, ip, acceptLang);

    const fingerFinded = await this.Repository.findFingerBrowser(fingerBrowser, id);

    if (fingerFinded) {
      if (fingerFinded.ip_hash === fingerIp) {
        await this.Repository.updateFingerPrint(fingerBrowser, fingerIp, id, fingerFinded.id);
      }
    } else {
      await this.Repository.saveFingerPrint(fingerBrowser, fingerIp, id, remeber);
    }
  }

  async requestresetPassword(email: string) {
    const userFinded = await this.Repository.getUserByEmail(email);

    if (!userFinded) throw new Error("US-EN");

    const token = await this.generateTokenToReset(userFinded.createdAt, userFinded.id, userFinded.email);

    const updated = await this.Repository.createLoginReset(userFinded.id, token);

    if (!updated.id) throw new Error("US-UK");

    //TODO LOGICA DE ENVIAR EMAIL.
    await this.sendresetEmail();
  }

  async loadTokenRequest(token: string) {
    if (!token || !token.trim()) {
      throw new Error("US-TI");
    }

    const r = await this.Repository.getToken(token);

    if (!r) throw new Error("US-TI");

    return r;
  }

  async resetPassword(password: string, reset: UserReset) {
    const hashPassword = await this.hashPassword(password);
    const { id_user } = reset;

    const response = await this.Repository.resetPassword(hashPassword, id_user);

    if (response.affected) {
      if (response?.affected <= 0) throw new Error("US-TI");
    }

    await this.Repository.closeMyResets(id_user);
  }

  async verifyEmail(token: string) {
    const { id, email, createdAt } = await this.decryptToken(token);
    const date = this.formatDate(createdAt);

    const userFinded = await this.Repository.getUserByTokenEmail(id, email, date);

    if (!userFinded) throw new Error("US-EN");

    if (userFinded.emailVerified) throw new Error("US-EV");

    const r = await this.Repository.ValidateUser(id);

    if (r.affected && r.affected == 1) {
      return;
    } else {
      throw new Error("US-SPE");
    }
  }

  async thisAccountNotMy(token: string) {
    const { id, email, createdAt } = await this.decryptToken(token);
    const date = this.formatDate(createdAt);

    const userFinded = await this.Repository.getUserByTokenEmail(id, email, date);

    if (!userFinded) throw new Error("US-EN");

    if (userFinded.emailVerified) throw new Error("US-EV");

    const r = await this.Repository.deleteAccount(id, email);

    if (r.affected && r.affected == 1) {
      return;
    } else {
      throw new Error("US-SPE");
    }
  }

  async loggout(user: User) {
    await this.Repository.loggout(user.id);
  }

  private checkRegexEmail(email: string): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw new Error("US-EI");
    }
  }

  private async validateLogin(password: string, user: User): Promise<string> {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("US-PI");
    }

    const token = jwt.sign(
      {
        id: user.id,
        permission: user.permission.name,
      },
      process.env.JWT_SECRET || "SUPER_SECRET",
      { expiresIn: "2h" },
    );

    return token;
  }

  private async getUserByEmail(email: string): Promise<User> {
    const response = await this.Repository.getUserByEmail(email);

    if (response) {
      return response;
    } else {
      throw new Error("US-EN");
    }
  }

  private isPasswordValid(password: string): void {
    const maxSize: number | undefined = Number(process.env.maxSize);
    const minSize: number | undefined = Number(process.env.minSize);

    if (!password || !password.trim()) {
      throw new Error("US-PE");
    }

    const length = password.length;

    if (maxSize !== undefined && minSize !== undefined) {
      if (length > maxSize || length < minSize) {
        throw new Error("US-PL");
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS: number = Number(process.env.SALT);
    if (SALT_ROUNDS !== undefined) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashed = await bcrypt.hash(password, salt);
      return hashed;
    }

    throw new Error("US-SPE");
  }

  private async sendresetEmail() {}

  private async generateTokenToReset(createdAt: Date, id: number, email: string): Promise<string> {
    const token = crypto
      .createHash("sha256")
      .update(createdAt.toISOString() + id + email + new Date().toISOString())
      .digest("hex");

    return token;
  }

  public generateToken(id: number, email: string, createdAt: Date) {
    const text = JSON.stringify({ id, email: email, createdAt: createdAt.getTime() });
    const iv = crypto.randomBytes(16);
    const SECRET = Buffer.from(process.env.TOKEN_SECRET_EMAIL || "12345678901234567890123456789012");
    const cipher = crypto.createCipheriv("aes-256-cbc", SECRET, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  private decryptToken(token: string) {
    try {
      const [ivHex, encryptedHex] = token.split(":");
      const iv = Buffer.from(ivHex, "hex");
      const encrypted = Buffer.from(encryptedHex, "hex");
      const SECRET = Buffer.from(process.env.TOKEN_SECRET_EMAIL || "12345678901234567890123456789012");
      const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET, iv);
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

      return JSON.parse(decrypted.toString());
    } catch (error) {
      throw new Error("US-NI");
    }
  }

  private formatDate(createdAt: number): string {
    const date = new Date(createdAt - 3 * 60 * 60 * 1000);

    const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Meses começam do 0
    const day = pad(date.getDate());

    const hours = pad(date.getUTCHours());

    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
    const milliseconds = pad(date.getUTCMilliseconds(), 3);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
