import { Router } from "express";
import { deleteAlbumByIdController, getAlbumByIdController, postAlbumByIdController, putAlbumByIdController } from "../controllers/albumController";

export const albumRuter: Router = Router();


albumRuter.get("/:id", getAlbumByIdController)
albumRuter.post("/", postAlbumByIdController)
albumRuter.put("/:id", putAlbumByIdController)
albumRuter.delete("/:id", deleteAlbumByIdController)