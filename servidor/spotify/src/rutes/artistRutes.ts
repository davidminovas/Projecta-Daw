import { Router } from "express";
import { deleteArtistByIdController, getArtistByIdController, postArtistByIdController, putArtistByIdController } from "../controllers/artistController";
import { getAllTArtists } from "../serveis/artistService";

export const artistRuter: Router = Router();

artistRuter.get("/", getAllTArtists)
artistRuter.get("/:id", getArtistByIdController)
artistRuter.post("/", postArtistByIdController)
artistRuter.put("/:id", putArtistByIdController)
artistRuter.delete("/:id", deleteArtistByIdController)