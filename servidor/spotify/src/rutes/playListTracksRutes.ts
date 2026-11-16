import { Router } from "express";
import { deletePlayListTrackController, postPlayListTrackController } from "../controllers/playListTracksController";


export const playListTrackRuter: Router = Router();

playListTrackRuter.post("/", postPlayListTrackController)
playListTrackRuter.delete("/:id", deletePlayListTrackController)