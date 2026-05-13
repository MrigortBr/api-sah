import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config({ quiet: true });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.LOGGING == "1" ? true : false,
  entities: ["src/data/entities/**/*{.ts,.js}"],
  migrations: ["src/data/migrations/**/*{.ts,.js}"],
  extra: {
    options: "-c timezone=America/Sao_Paulo",
  },
});

export const db = AppDataSource.initialize();
