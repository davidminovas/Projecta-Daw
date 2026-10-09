import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { Response, Request } from "express";
import { createCountry, getCountryById, substitCountry } from "../serveis/countryService";
import { Countrys } from "../interfaces/data/country/dataCountrys";

export function getCountryByIdController(req: Request, res: Response):Response {
    const findCountry: CountryBD | undefined = getCountryById(req.params.id as string)

    if (findCountry) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findCountry);
};

export function postCountryByIdController(req: Request, res: Response): Response { 

    const result: CreateSuccessService<CountryBD> | ErrorService = createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    Countrys.push((result as CreateSuccessService<CountryBD>).data);
    return res.status(result.code).json(result)
}

export function putCountryByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<CountryBD> | ErrorService = substitCountry(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<CountryBD>).index;
    Countrys[index] = (result as PutSuccessService<CountryBD>).data;

    return res.status(result.code).json(result)
}

