import { Router } from "express";
import { getCountryByIdController, postCountryByIdController, putCountryByIdController } from "../controllers/countryController";

export const countryRouter: Router = Router();


countryRouter.get("/:id", getCountryByIdController)
countryRouter.post("/", postCountryByIdController)
countryRouter.put("/:id", putCountryByIdController)
