import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../config/env";
import type { GetArtist } from "../../APIManagement/Artist/interfices/Artist";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TtrackCreate";
import type { AddSongFromProps } from "./Types/AddSongFormProps";

const AddSongForm = (props: AddSongFromProps) => {
    const [artists, setArtist] = useState<GetArtist[]>([]);

    async function chargeArtist() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
        const listArtist: GetArtist[] = await resposta.json() as GetArtist[];

        setArtist(listArtist);
    }
    useEffect(
        () => {
            chargeArtist();
        }, []
    );

    async function handelSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const dades = new FormData(event.currentTarget);
        const song: TrackCreate = {
            title: String(dades.get("title") ?? "").trim(),
            artist: String(dades.get("artist") ?? "").trim(),
            duration: Number(dades.get("duration")),
        }
        await props.submit(song);


    }
    return (
        <>
            <h1>Afegir canço</h1>
            <form onSubmit={handelSubmit}>
                <p>
                    <label>
                        Titol: <input
                            type="text"
                            name="title"
                            defaultValue={props.song?.tittle}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Duration: <input
                            type="number"
                            name="duration"
                            defaultValue={props.song?.duration}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Artist:
                        {
                            artists.length > 0
                                ? <select name="artist" defaultValue={props.song?.artist_id} required>{
                                    artists.map(
                                        (a: GetArtist) => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))

                                }</select>
                                : <></>
                        }
                        <button type="button">Add</button>
                    </label>

                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    )

}

export default AddSongForm;