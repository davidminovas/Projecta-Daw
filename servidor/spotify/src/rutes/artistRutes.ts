import { Router } from "express";
import { deleteArtistByIdController, getAllArtistController, getArtistByIdController, postArtistByIdController, putArtistByIdController } from "../controllers/artistController";


export const artistRuter: Router = Router();

artistRuter.get("/", getAllArtistController)
artistRuter.get("/:id", getArtistByIdController)
artistRuter.post("/", postArtistByIdController)
artistRuter.put("/:id", putArtistByIdController)
artistRuter.delete("/:id", deleteArtistByIdController)