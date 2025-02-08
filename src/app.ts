import express, { Express, Response, Request, NextFunction } from "express";
import cors from "cors";
import multer from "multer";
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

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    let message = "File upload error.";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "The file exceeds the 4MB limit.";
    } else if (err.code === "LIMIT_FILE_COUNT") {
      message = "You can only upload a limited number of files.";
    }

    res.status(400).json({ message });
    return;
  }

  if (err?.message === "Just images are allowed!") {
    res.status(400).json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error!" });
  return;
});

export { app };
