import "reflect-metadata";
import { DataSource } from "typeorm";

if (!process.env.DB_TYPE) {
  throw new Error("DB_TYPE environment variable not set.");
}

if (!process.env.DB_HOST) {
  throw new Error("DB_HOST environment variable not set.");
}

if (!process.env.DB_PORT) {
  throw new Error("DB_PORT environment variable not set.");
}

if (!process.env.DB_USERNAME) {
  throw new Error("DB_USERNAME environment variable not set.");
}

if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD environment variable not set.");
}

if (!process.env.DB_DATABASE) {
  throw new Error("DB_DATABASE environment variable not set.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable not set.");
}

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ["src/models/*.ts"],
  subscribers: [],
  migrations: [],
});
