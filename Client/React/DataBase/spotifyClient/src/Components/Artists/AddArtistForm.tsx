import { useEffect, useState, type SubmitEvent } from "react";
import type { ArtistCreate } from "../../APIManagement/Artist/interfices/ArtistCreate";
import type { Country } from "../../APIManagement/Country/Interfaces/Country";
import { ENV } from "../../config/env";
import type { AddArtistFormProps } from "./Types/AddArtistFormProps";

const AddArtistForm = (props: AddArtistFormProps) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [countryError, setCountryError] = useState("");

    useEffect(() => {
        async function loadCountries() {
            try {
                const response = await fetch(`${ENV.API_BASE_URL}/countrys`);
                if (!response.ok) throw new Error("No s'han pogut carregar els països");

                const list: Country[] = await response.json();
                setCountries(list);
            } catch (error) {
                setCountryError(error instanceof Error ? error.message : "Error inesperat");
            }
        }

        void loadCountries();
    }, []);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const artist: ArtistCreate = {
            name: String(data.get("name") ?? "").trim(),
            artisticName: String(data.get("artisticName") ?? "").trim(),
            country: String(data.get("country") ?? "").trim(),
        };

        await props.submit(artist);
    }

    return (
        <>
            <h2>{props.artist ? "Modificar artista" : "Afegir artista"}</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Nom: <input
                            type="text"
                            name="name"
                            defaultValue={props.artist?.name}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Nom artístic: <input
                            type="text"
                            name="artisticName"
                            defaultValue={props.artist?.pseudonym}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        País: <select
                            name="country"
                            defaultValue={props.artist?.country_id ?? ""}
                            required
                            disabled={countries.length === 0}
                        >
                            <option value="" disabled>Tria un país</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </p>
                {countryError && <p role="alert">{countryError}</p>}
                <button type="submit" disabled={countries.length === 0}>Desa</button>
            </form>
        </>
    );
};

export default AddArtistForm;
