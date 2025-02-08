import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = userRepository.create({ username, password });
      await userRepository.save(user);

      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        res.status(400).json({ message: "User not found!" });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid password!" });
        return;
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
