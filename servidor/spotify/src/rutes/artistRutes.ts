import { Router } from "express";
import { deleteArtistByIdController, getArtistByIdController, postArtistByIdController, putArtistByIdController } from "../controllers/artistController";

export const artistRuter: Router = Router();


artistRuter.get("/:id", getArtistByIdController)
artistRuter.post("/", postArtistByIdController)
artistRuter.put("/:id", putArtistByIdController)
artistRuter.delete("/:id", deleteArtistByIdController)