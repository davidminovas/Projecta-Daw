import { Router } from "express";
import { getAlbumTrackByIdController, postAlbumTrackByIdController, putAlbumTrackByIdController } from "../controllers/albumTrackController";
export const albumTrackRuter: Router = Router();
albumTrackRuter.get("/:id", getAlbumTrackByIdController)
albumTrackRuter.post("/", postAlbumTrackByIdController)
albumTrackRuter.put("/:id", putAlbumTrackByIdController)