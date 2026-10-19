import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { Response, Request } from "express";
import { createCountry, getCountryById, substitCountry } from "../serveis/countryService";
import { Countrys } from "../interfaces/data/country/dataCountrys";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";

export async function getCountryByIdController(req: Request, res: Response): Promise<Response> {
    const findCountry: SelectSuccessService<CountryBD> | ErrorService = await getCountryById(req.params.id as string)

    if (!findCountry.success) {
        return res.status(findCountry.code).json({ message: (findCountry as ErrorService).message })
    }
    return res.status(findCountry.code).json(findCountry);
};


export async function postCountryByIdController(req: Request, res: Response): Promise<Response> { 

    const result: CreateSuccessService<CountryBD> | ErrorService = await createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}


export async function putCountryByIdController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<CountryBD> | ErrorService = await substitCountry(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(result.code).json(result)
}
