import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import { Tag } from "../models/Tag";
import { AppDataSource } from "../data-source";

export class ProjectController {
  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projectRepository = AppDataSource.getRepository(Project);
      const projects = await projectRepository.find({ relations: ["tags"] });
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body.project;
      const { title, repoUrl, serviceUrl, isBackend, tags } = JSON.parse(body);
      const imageUrl = req.file ? req.file.filename : "";

      const projectRepository = AppDataSource.getRepository(Project);
      const tagRepository = AppDataSource.getRepository(Tag);

      const tagEntities = await Promise.all(
        tags.map(async (tagName: string) => {
          let tag = await tagRepository.findOne({ where: { name: tagName } });
          if (!tag) {
            tag = tagRepository.create({ name: tagName });
            await tagRepository.save(tag);
          }
          return tag;
        })
      );

      const project = projectRepository.create({
        title,
        imageUrl,
        repoUrl,
        serviceUrl,
        isBackend,
        tags: tagEntities,
      });

      await projectRepository.save(project);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
}
