import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyInfoFingerPrint } from "../../util/helper/fingerPrint";
import { keyJwt } from "./type";

export async function verifyLoginStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const userAgent = req.headers["user-agent"] || "";
    const ip = req.ip || req.connection?.remoteAddress || "";
    const acceptLang = req.headers["accept-language"] || "";
    const keyJwt: keyJwt = getJwt(req);

    const user = await verifyInfoFingerPrint(userAgent, ip, acceptLang, keyJwt.id);

    req.user = user;

    next();
  } catch (error) {
    if (process.env.LOGGING_ERRORS == "1") console.log(error);
    next(new Error("PE-NLTA"));
  }
}

function getJwt(req: Request): keyJwt {
  const tokenHeader = req.headers.authorization || "";
  const tokenBody = req.body ?? undefined;

  if (tokenHeader) return jwt.decode(tokenHeader) as keyJwt;
  if (tokenBody) return jwt.decode(tokenBody["Authorization"]) as keyJwt;

  throw new Error("PE-NLTA");
}
