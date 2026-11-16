import { Router } from "express";
import { getAlbumTrackByIdController, postAlbumTrackController, putAlbumTrackController } from "../controllers/albumTrackController";
export const albumTrackRuter: Router = Router();
albumTrackRuter.get("/:id", getAlbumTrackByIdController)
albumTrackRuter.post("/", postAlbumTrackController)
albumTrackRuter.put("/:id", putAlbumTrackController)