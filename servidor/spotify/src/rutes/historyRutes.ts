import { Router } from "express";
import { getHistoryById } from "../serveis/histroyService";

export const historyRuter: Router = Router();


historyRuter.get("/:id", getHistoryById)
historyRuter.post("/", getHistoryById)
