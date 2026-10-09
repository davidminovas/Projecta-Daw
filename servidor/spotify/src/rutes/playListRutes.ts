import { Router } from "express";
import { deletePLByIdController, getPLByIdController, postPLByIdController, putPLByIdController } from "../controllers/playListController";

export const playListRouter: Router = Router();


playListRouter.get("/:id", getPLByIdController)
playListRouter.post("/", postPLByIdController)
playListRouter.put("/:id", putPLByIdController)
playListRouter.delete("/:id", deletePLByIdController)