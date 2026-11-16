import { Router } from "express";
import { getHistoryByIdController, postHistoryController } from "../controllers/historyController";

export const historyRuter: Router = Router();


historyRuter.get("/:id", getHistoryByIdController)
historyRuter.post("/", postHistoryController)
