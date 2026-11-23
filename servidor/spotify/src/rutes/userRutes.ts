import { Router } from "express";
import { deleteUserController, getAllUserController, getUserByIdController, postUserController, putUserController } from "../controllers/userController";

export const userRuter: Router = Router();

userRuter.get("/", getAllUserController)
userRuter.get("/:id", getUserByIdController)
userRuter.post("/", postUserController)
userRuter.put("/:id", putUserController)
userRuter.delete("/:id", deleteUserController)
