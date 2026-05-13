import { NextFunction, Request, Response } from "express";
import { Controller, Route } from "../../base/routerDecorator";
import UserService from "./Service";
import "./Errors";
import { verifyLoginStatus } from "../../middlewares/login/verifyLogin";

@Controller("/")
export default class UserController {
  private Service = new UserService();

  @Route("/login", "post")
  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password, remember } = req.body;
    const userAgent = req.headers["user-agent"] || "";
    const ip = req.ip || req.connection?.remoteAddress || "";
    const acceptLang = req.headers["accept-language"] || "";

    try {
      const { jwt, id } = await this.Service.loginUser(email, password);
      await this.Service.assignLogin(id, userAgent, ip, acceptLang, remember);
      res.success({ jwt }, "Login realizado com sucesso!");
    } catch (error) {
      next(error);
    }
  }

  @Route("/reset", "post")
  async requestresetpassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await this.Service.requestresetPassword(email);
      res.success({}, "Email enviado com sucesso!");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @Route("/reset/:token", "patch")
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const userReset = await this.Service.loadTokenRequest(token);
      await this.Service.resetPassword(password, userReset);

      res.success({}, "Senha alterada com sucesso!");
    } catch (error) {
      next(error);
    }
  }

  @Route("/loggout", "delete", [verifyLoginStatus])
  async loggout(req: Request, res: Response, next: NextFunction) {
    try {
      await this.Service.loggout(req.user);

      res.success({}, "Loggout realizado com sucesso!");
    } catch (error) {
      next(error);
    }
  }
}
