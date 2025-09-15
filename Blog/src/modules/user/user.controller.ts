import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    console.log(result);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllFromDB();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const findUserById = await UserService.getSingleUserById(
      Number(req.params.id)
    );

    res.status(201).json(findUserById);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.status(200).json({
      message: "User Delete Succesfully!!!",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const data = await UserService.updateUser(Number(req.params.id), req.body);

    res.status(200).json({
      message: "User Updated Succesfully!!!!",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserController = {
  createUser,
  getAllFromDB,
  getSingleUserById,
  deleteUser,
  updateUser,
};
