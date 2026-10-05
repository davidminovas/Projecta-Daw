import { Country } from "../country/country";

export interface User{
    id: string;
    email: string;
    country: Country; //FK
}