import { Router } from "express";
import { deletePLByIdController, getAllPlaylistController, getPLByIdController, postPLByIdController, putPLByIdController } from "../controllers/playListController";

export const playListRuter: Router = Router();


playListRuter.get("/", getAllPlaylistController)
playListRuter.get("/:id", getPLByIdController)
playListRuter.post("/", postPLByIdController)
playListRuter.put("/:id", putPLByIdController)
playListRuter.delete("/:id", deletePLByIdController)