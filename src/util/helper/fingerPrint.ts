import crypto from "crypto";
import { UserLogin } from "../../data/entities/UserLogin";
import { AppDataSource } from "../../data/data-source";
import { MoreThan } from "typeorm";

export async function verifyInfoFingerPrint(userAgent: string, ip: string, acceptLang: string, id_user: number) {
  const loginRepo = AppDataSource.getRepository(UserLogin);
  const { fingerBrowser, fingerIp } = generateFingerPrint(userAgent, ip, acceptLang);

  const fingerFinded = await loginRepo.findOne({
    where: { finger_print: fingerBrowser, id_user, expires_at: MoreThan(new Date()) },
    relations: { user: true },
  });

  if (fingerFinded) {
    if (fingerFinded.ip_hash != fingerIp) {
      await loginRepo.update({ id: fingerFinded.id, id_user, finger_print: fingerBrowser }, { updatedAt: new Date(), ip_hash: fingerIp });
    }
  } else {
    throw new Error("PE-NLTA");
  }

  return fingerFinded.user;
}

export function generateFingerPrint(userAgent: string, ip: string, acceptLang: string) {
  const salt = process.env.FINGERPRINT_SALT;

  const fingerBrowser = crypto
    .createHash("sha256")
    .update(userAgent + acceptLang + salt)
    .digest("hex");

  const fingerIp = crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex");

  return { fingerBrowser, fingerIp };
}
