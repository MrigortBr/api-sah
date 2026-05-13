import dotenv from "dotenv";
import { Permission } from "../../data/entities/Permission";
import { User } from "../../data/entities/User";
import { UserLogin } from "../../data/entities/UserLogin";
import { Between, MoreThan } from "typeorm";
import { UserReset } from "../../data/entities/UserReset";
import { AppDataSource } from "../../data/data-source";

dotenv.config({ quiet: true });

export default class UserRepository {
  private userRepo = AppDataSource.getRepository(User);
  private permissionRepo = AppDataSource.getRepository(Permission);
  private loginRepo = AppDataSource.getRepository(UserLogin);
  private resetRepo = AppDataSource.getRepository(UserReset);

  async countByEmail(email: string): Promise<number> {
    try {
      return await this.userRepo.countBy({ email });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepo.findOne({
        where: { email: email },
        select: { id: true, email: true, password: true, permission: true, emailVerified: true, createdAt: true },
        relations: { permission: true },
      });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async saveFingerPrint(finger_print: string, ip_hash: string, id_user: number, remember: boolean) {
    try {
      const expiresAt = remember ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 10 * 60 * 60 * 1000);

      const entity = this.loginRepo.create({
        id_user,
        finger_print,
        ip_hash,
        expires_at: expiresAt,
      });

      return await this.loginRepo.save(entity);
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async findFingerBrowser(finger_print: string, id_user: number) {
    try {
      return await this.loginRepo.findOne({ where: { id_user, finger_print, expires_at: MoreThan(new Date()) } });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async updateFingerPrint(finger_print: string, ip_hash: string, id_user: number, id: number) {
    try {
      return await this.loginRepo.update({ id, id_user, finger_print }, { updatedAt: new Date(), ip_hash: ip_hash });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async createLoginReset(id_user: number, token: string) {
    try {
      await this.resetRepo.update({ id_user, is_avaliable: true }, { is_avaliable: false, expires_at: new Date() });
      return await this.resetRepo.save({ id_user, token, is_avaliable: true });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getToken(token: string) {
    try {
      return await this.resetRepo.findOne({ where: { token, expires_at: MoreThan(new Date()) }, select: { id_user: true } });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async resetPassword(password: string, id: number) {
    try {
      return await this.userRepo.update({ id }, { password });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async closeMyResets(id_user: number) {
    try {
      await this.resetRepo.update({ id_user, is_avaliable: true }, { is_avaliable: false, expires_at: new Date() });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async getUserByTokenEmail(id: number, email: string, createdAt: string) {
    try {
      const ts = new Date(createdAt).getTime();
      const start = new Date(ts - 500);
      const end = new Date(ts + 500);

      return await this.userRepo.findOne({ where: { id, email, createdAt: Between(start, end) } });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async ValidateUser(id: number) {
    try {
      return await this.userRepo.update({ id }, { emailVerified: true });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async deleteAccount(id: number, email: string) {
    try {
      console.log(id);
      return await this.userRepo.update({ id }, { deletedAt: new Date(), email: "INVALID  " + email });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }

  async loggout(id: number) {
    try {
      return await this.loginRepo.update({ id_user: id }, { expires_at: new Date() });
    } catch (error) {
      if (process.env.LOGGING_ERRORS == "1") console.log(error);
      throw new Error("US-UK");
    }
  }
}
