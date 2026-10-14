import { Router } from "express";
import { deleteUserByIdController, getUserByIdController, postUserByIdController, putUserByIdController } from "../controllers/userController";

export const userRuter: Router = Router();


userRuter.get("/:id", getUserByIdController)
userRuter.post("/", postUserByIdController)
userRuter.put("/:id", putUserByIdController)
userRuter.delete("/:id", deleteUserByIdController)