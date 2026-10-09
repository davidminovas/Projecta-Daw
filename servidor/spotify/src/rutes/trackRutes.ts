import { Router } from "express";
import { deleteTrackByIdController, getAllTracksController, getTrackByIdController, postTrackByIdController, putTrackByIdController } from "../controllers/tracksController";

export const trackRouter: Router = Router();

trackRouter.get("/", getAllTracksController)
trackRouter.get("/:id", getTrackByIdController)
trackRouter.post("/", postTrackByIdController)
trackRouter.put("/:id", putTrackByIdController)
trackRouter.delete("/:id", deleteTrackByIdController)