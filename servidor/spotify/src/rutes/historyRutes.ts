import { Router } from "express";
import { getHistoryByIdController, postHistoryByIdController } from "../controllers/historyController";

export const historyRuter: Router = Router();


historyRuter.get("/:id", getHistoryByIdController)
historyRuter.post("/", postHistoryByIdController)
