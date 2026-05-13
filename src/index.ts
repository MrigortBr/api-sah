import dotenv from "dotenv";
import express from "express";
import "./base/routerDecorator";
import { RegisterRoutes } from "./base/routerDecorator";
import cors from "cors";
import { errorHandler } from "./middlewares/error/errorHandler";
import { AppDataSource } from "./data/data-source";
import { responseMiddleware } from "./middlewares/response/responseHandler";

dotenv.config({ quiet: true });

class Server {
  private url: string = process.env.URL || "127.0.0.1";
  private port: string = process.env.PORT || "2000";
  private app;

  constructor() {
    this.app = express();
    this.connectDb();
    this.loadConfig();
    this.loadRoutesAndMiddlewares();
    this.listenServer();
  }

  private loadConfig() {
    this.app.use(express.json({ limit: process.env.SIZELIMIT || "10mb" }));
    this.app.use(cors());
  }

  private async loadRoutesAndMiddlewares() {
    this.app.use(responseMiddleware);

    this.app.use(await RegisterRoutes());
    this.app.use(errorHandler);
  }

  private connectDb() {
    AppDataSource.initialize().then(() => {});
  }

  private listenServer() {
    this.app.listen(this.port, () => {
      console.log(`🔷 Api running ${this.url}:${this.port}`);
    });
  }
}

new Server();
