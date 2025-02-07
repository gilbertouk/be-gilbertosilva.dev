import express, { Express, Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import { AppDataSource } from "./data-source";

import projectRoutes from "./routes/projectRoutes";
import tagRoutes from "./routes/tagRoutes";
import userRoutes from "./routes/userRoutes";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
    process.exit(1);
  });

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to the API of my Portfolio");
});

app.use("/api", projectRoutes);
app.use("/api", tagRoutes);
app.use("/api", userRoutes);

export { app };
