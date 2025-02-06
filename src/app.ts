import express, { Express, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes";
import tagRoutes from "./routes/tagRoutes";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to the API of my Portfolio");
});

app.use("/api", projectRoutes);
app.use("/api", tagRoutes);

export { app };
