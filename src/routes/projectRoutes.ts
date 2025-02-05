import express from "express";
import { ProjectController } from "../controllers/ProjectController";
import { upload } from "../middleware/upload";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const projectController = new ProjectController();

router.get("/projects", projectController.getAllProjects);
router.post(
  "/projects",
  authMiddleware,
  upload.single("image"),
  projectController.createProject
);

export default router;
