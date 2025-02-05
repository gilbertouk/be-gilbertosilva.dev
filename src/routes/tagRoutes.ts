import express from "express";
import { TagController } from "../controllers/TagController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
const tagController = new TagController();

router.get("/tags", tagController.getAllTags);
router.post("/tags", authMiddleware, tagController.createTag);
router.put("/tags/:id", authMiddleware, tagController.updateTag);

export default router;
