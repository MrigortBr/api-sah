/* eslint-disable @typescript-eslint/no-explicit-any */
import "express";
import { User } from "../../data/entities/User";

declare global {
  namespace Express {
    interface Response {
      success: <T = any>(data?: T, message?: string, description?: string, statuscode?: number = 200) => Response;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
