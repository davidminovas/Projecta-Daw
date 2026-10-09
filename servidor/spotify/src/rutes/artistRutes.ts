import { Router } from "express";
import { deleteArtistByIdController, getArtistByIdController, postArtistByIdController, putArtistByIdController } from "../controllers/artistController";

export const artistRouter: Router = Router();


artistRouter.get("/:id", getArtistByIdController)
artistRouter.post("/", postArtistByIdController)
artistRouter.put("/:id", putArtistByIdController)
artistRouter.delete("/:id", deleteArtistByIdController)