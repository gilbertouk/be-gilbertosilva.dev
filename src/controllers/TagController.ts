import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Tag } from "../models/Tag";

export class TagController {
  async getAllTags(req: Request, res: Response) {
    const tagRepository = getRepository(Tag);
    const tags = await tagRepository.find();
    res.json(tags);
  }

  async createTag(req: Request, res: Response) {
    const { name } = req.body;
    const tagRepository = getRepository(Tag);

    const tag = tagRepository.create({ name });
    await tagRepository.save(tag);
    res.status(201).json(tag);
  }

  async updateTag(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const tagRepository = getRepository(Tag);

    const tag = await tagRepository.findOne(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag não encontrada" });
    }

    tag.name = name;
    await tagRepository.save(tag);
    res.json(tag);
  }
}
