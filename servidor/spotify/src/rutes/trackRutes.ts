import { Router } from "express";
import { deleteTrackByIdController, getAllTracksController, getTrackByIdController, postTrackByIdController, postTrackUserHistoryController, putTrackByIdController } from "../controllers/tracksController";

export const trackRuter: Router = Router();

trackRuter.get("/", getAllTracksController)
trackRuter.get("/:id", getTrackByIdController)
trackRuter.post("/", postTrackByIdController)
trackRuter.put("/:id", putTrackByIdController)
trackRuter.delete("/:id", deleteTrackByIdController)


trackRuter.post("/user/history", postTrackUserHistoryController)