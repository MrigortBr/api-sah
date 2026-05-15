import { Request, Response, NextFunction } from "express";

export function verifyPermissionTecnhic(req: Request, res: Response, next: NextFunction) {
  verifyPermission(req, res, next, 2);
}

async function verifyPermission(req: Request, res: Response, next: NextFunction, idPermitted: number) {
  try {
    if (req.user.permission.id == 1) {
      next();
      return;
    } else if (idPermitted !== req.user.permission.id) throw new Error("PE-NHPR");

    next();
  } catch (error) {
    if (process.env.LOGGING_ERRORS == "1") console.log(error);
    next(new Error("PE-NHPR"));
  }
}
