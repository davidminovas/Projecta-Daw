import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { Response, Request } from "express";
import { createCountry, getAllCountries, getCountryById, substitCountry } from "../serveis/countryService";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";

export async function getAllCountriesController(_req: Request, res: Response): Promise<Response> {
    const countries: CountryBD[] = await getAllCountries();
    return res.status(200).json(countries);
}

export async function getCountryByIdController(req: Request, res: Response): Promise<Response> {
    const findCountry: SelectSuccessService<CountryBD> | ErrorService = await getCountryById(req.params.id as string)

    if (!findCountry.success) {
        return res.status(findCountry.code).json({ message: (findCountry as ErrorService).message })
    }
    return res.status(findCountry.code).json(findCountry);
};


export async function postCountryController(req: Request, res: Response): Promise<Response> {

    const result: CreateSuccessService | ErrorService = await createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}


export async function putCountryController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService | ErrorService = await substitCountry(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result)
}
