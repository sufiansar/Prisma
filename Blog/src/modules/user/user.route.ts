import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllFromDB);
router.get("/:id", UserController.getSingleUserById);

router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id", UserController.updateUser);

export const userRouter = router;
