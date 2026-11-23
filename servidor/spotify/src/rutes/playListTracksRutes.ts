import { Router } from "express";
import { deletePlayListTrackController, getAllPlayListTrackController, getPlaylistTracksController, postPlayListTrackController } from "../controllers/playListTracksController";


export const playListTrackRuter: Router = Router();


playListTrackRuter.get("/", getPlaylistTracksController)
playListTrackRuter.get("/:id", getAllPlayListTrackController)
playListTrackRuter.post("/", postPlayListTrackController)
playListTrackRuter.delete("/:id", deletePlayListTrackController)