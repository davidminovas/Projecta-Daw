import { Router } from "express";
import { deleteArtistController, getAllArtistController, getArtistByIdController, postArtistController, putArtistController } from "../controllers/artistController";


export const artistRuter: Router = Router();

artistRuter.get("/", getAllArtistController)
artistRuter.get("/:id", getArtistByIdController)
artistRuter.post("/", postArtistController)
artistRuter.put("/:id", putArtistController)
artistRuter.delete("/:id", deleteArtistController)