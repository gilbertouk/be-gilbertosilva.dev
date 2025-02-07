import { Request, Response } from "express";
// import { getRepository } from 'typeorm';
import { User } from "../models/User";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

export class UserController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({ username, password });
    await userRepository.save(user);

    res.status(201).json({ message: "User registered successfully!" });
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  }
}
