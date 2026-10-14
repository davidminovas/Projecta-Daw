import { Router } from "express";
import { deletePLByIdController, getPLByIdController, postPLByIdController, putPLByIdController } from "../controllers/playListController";

export const playListRuter: Router = Router();


playListRuter.get("/:id", getPLByIdController)
playListRuter.post("/", postPLByIdController)
playListRuter.put("/:id", putPLByIdController)
playListRuter.delete("/:id", deletePLByIdController)