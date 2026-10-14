import { Router } from "express";
import { deletePlayListTrackByIdController, postPlayListTrackByIdController } from "../controllers/playListTracksController";


export const playListTrackRuter: Router = Router();

playListTrackRuter.post("/", postPlayListTrackByIdController)
playListTrackRuter.delete("/:id", deletePlayListTrackByIdController)