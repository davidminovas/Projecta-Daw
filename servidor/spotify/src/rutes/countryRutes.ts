import { Router } from "express";
import { getCountryByIdController, postCountryByIdController, putCountryByIdController } from "../controllers/countryController";

export const countryRuter: Router = Router();


countryRuter.get("/:id", getCountryByIdController)
countryRuter.post("/", postCountryByIdController)
countryRuter.put("/:id", putCountryByIdController)
