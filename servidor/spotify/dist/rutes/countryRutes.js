"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryRuter = void 0;
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController");
exports.countryRuter = (0, express_1.Router)();
exports.countryRuter.get("/:id", countryController_1.getCountryByIdController);
exports.countryRuter.post("/", countryController_1.postCountryController);
exports.countryRuter.put("/:id", countryController_1.putCountryController);
