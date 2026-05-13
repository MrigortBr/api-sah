/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./type";

export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send.bind(res);

  res.success = function<T = any>(data?: T, message = "OK", statuscode = 200, description = "") {
    const payload: ApiResponse<T> = {
      message,
      description,
      data,
    };
    res.statusCode = statuscode;
    return originalSend(payload);
  };

  next();
}
