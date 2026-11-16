import { Router } from "express";
import { deletePLController, getAllPlaylistController, getPLByIdController, postPLController, putPLController } from "../controllers/playListController";
import { getPlaylistTracksController } from "../controllers/playListTracksController";

export const playListRuter: Router = Router();


playListRuter.get("/", getAllPlaylistController)
playListRuter.get("/:id/tracks", getPlaylistTracksController)
playListRuter.get("/:id", getPLByIdController)
playListRuter.post("/", postPLController)
playListRuter.put("/:id", putPLController)
playListRuter.delete("/:id", deletePLController)