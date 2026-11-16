import { Router } from "express";
import { deleteAlbumController, getAlbumByIdController, postAlbumController, putAlbumController } from "../controllers/albumController";

export const albumRuter: Router = Router();


albumRuter.get("/:id", getAlbumByIdController)
albumRuter.post("/", postAlbumController)
albumRuter.put("/:id", putAlbumController)
albumRuter.delete("/:id", deleteAlbumController)