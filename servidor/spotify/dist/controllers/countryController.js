"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCountriesController = getAllCountriesController;
exports.getCountryByIdController = getCountryByIdController;
exports.postCountryController = postCountryController;
exports.putCountryController = putCountryController;
const countryService_1 = require("../serveis/countryService");
async function getAllCountriesController(_req, res) {
    const countries = await (0, countryService_1.getAllCountries)();
    return res.status(200).json(countries);
}
async function getCountryByIdController(req, res) {
    const findCountry = await (0, countryService_1.getCountryById)(req.params.id);
    if (!findCountry.success) {
        return res.status(findCountry.code).json({ message: findCountry.message });
    }
    return res.status(findCountry.code).json(findCountry);
}
;
async function postCountryController(req, res) {
    const result = await (0, countryService_1.createCountry)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putCountryController(req, res) {
    const result = await (0, countryService_1.substitCountry)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
