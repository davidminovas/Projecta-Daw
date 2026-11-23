import { Router } from "express";
import { deleteAlbumTrackController, postAlbumTrackController } from "../controllers/albumTrackController";
export const albumTrackRuter: Router = Router();
albumTrackRuter.post("/", postAlbumTrackController)
albumTrackRuter.delete("/:id", deleteAlbumTrackController)