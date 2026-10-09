import { Router } from "express";
import { deleteUserByIdController, getUserByIdController, postUserByIdController, putUserByIdController } from "../controllers/userController";

export const userRouter: Router = Router();


userRouter.get("/:id", getUserByIdController)
userRouter.post("/", postUserByIdController)
userRouter.put("/:id", putUserByIdController)
userRouter.delete("/:id", deleteUserByIdController)