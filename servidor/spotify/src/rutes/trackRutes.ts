import { Router } from "express";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, postTrackUserHistoryController, putTrackController } from "../controllers/tracksController";

export const trackRuter: Router = Router();

trackRuter.get("/", getAllTracksController)
trackRuter.get("/:id", getTrackByIdController)
trackRuter.post("/", postTrackController)
trackRuter.put("/:id", putTrackController)
trackRuter.delete("/:id", deleteTrackController)


trackRuter.post("/user/history", postTrackUserHistoryController)