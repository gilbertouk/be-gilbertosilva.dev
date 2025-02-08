import { NextFunction, Request, Response } from "express";
import { Tag } from "../models/Tag";
import { AppDataSource } from "../data-source";

export class TagController {
  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tagRepository = AppDataSource.getRepository(Tag);
      const tags = await tagRepository.find();
      res.json(tags);
    } catch (error) {
      next(error);
    }
  }

  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const tagRepository = AppDataSource.getRepository(Tag);
      const tag = tagRepository.create({ name });
      await tagRepository.save(tag);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }

  async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const tagRepository = AppDataSource.getRepository(Tag);

      const tag = await tagRepository.findOne({ where: { id } });
      if (!tag) {
        res.status(404).json({ message: "Tag not found" });
        return;
      }

      tag.name = name;
      await tagRepository.save(tag);
      res.json(tag);
    } catch (error) {
      next(error);
    }
  }
}
