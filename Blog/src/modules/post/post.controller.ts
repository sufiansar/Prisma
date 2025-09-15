import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const data = await PostService.createPost(req.body);

    res.status(200).json({
      message: "User Create Successfully!!!",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const result = await PostService.getAllPost({
      page,
      limit,
      search,
      isFeatured,
    });

    res.status(200).json({
      message: "Post Retrived Successfully!!!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSinglePostById = async (req: Request, res: Response) => {
  const result = await PostService.getSinglePostById(Number(req.params.id));
  res.status(200).json({
    message: "Single Post Retrived Successfully!!!",
    data: result,
  });
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const data = await PostService.updatePost(Number(req.params.id), req.body);
    res.status(200).json({
      message: "Post Updated Successfully!!!",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const dltPost = async (req: Request, res: Response) => {
  try {
    const data = await PostService.dltPost(Number(req.params.id));
    res.status(200).json({
      message: "Post Deleted Successfully!!!",
      data: data,
    });
  } catch (error) {}
};

export const PostController = {
  createPost,
  updatePost,
  getAllPost,
  getSinglePostById,
  dltPost,
};
