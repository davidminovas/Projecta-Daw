import { Router } from "express";
import { getCountryByIdController, postCountryController, putCountryController } from "../controllers/countryController";

export const countryRuter: Router = Router();


countryRuter.get("/:id", getCountryByIdController)
countryRuter.post("/", postCountryController)
countryRuter.put("/:id", putCountryController)
