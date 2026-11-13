import { Router } from "express";
import { deletePLByIdController, getAllPlaylistController, getPLByIdController, postPLByIdController, putPLByIdController } from "../controllers/playListController";
import { getPlaylistTracksController } from "../controllers/playListTracksController";

export const playListRuter: Router = Router();


playListRuter.get("/", getAllPlaylistController)
playListRuter.get("/:id/tracks", getPlaylistTracksController)
playListRuter.get("/:id", getPLByIdController)
playListRuter.post("/", postPLByIdController)
playListRuter.put("/:id", putPLByIdController)
playListRuter.delete("/:id", deletePLByIdController)