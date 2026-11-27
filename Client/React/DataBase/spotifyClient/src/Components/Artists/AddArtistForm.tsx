import { type SubmitEvent } from "react";
import type { ArtistCreate } from "../../APIManagement/Artist/interfices/ArtistCreate";
import type { AddArtistFormProps } from "./Types/AddArtistFormProps";

const AddArtistForm = (props: AddArtistFormProps) => {
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
                        País (ID): <input
                            type="text"
                            name="country"
                            defaultValue={props.artist?.country_id}
                            required
                        />
                    </label>
                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    );
};

export default AddArtistForm;
