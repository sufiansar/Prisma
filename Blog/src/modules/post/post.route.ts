import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();
router.get("/", PostController.getAllPost);
router.get("/:id", PostController.getSinglePostById);
router.post("/", PostController.createPost);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.dltPost);

export const PostRouter = router;
