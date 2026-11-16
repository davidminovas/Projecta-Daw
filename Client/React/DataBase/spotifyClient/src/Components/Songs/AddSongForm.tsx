import { useEffect, useState, type SubmitEvent } from "react";
import { ENV } from "../../config/env";

import type { GetArtist } from "../../APIManagement/Artist/interfices/Artist";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TtrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import type { AddSongFromProps } from "./Types/AddSongFormProps";

const AddSongForm = (props:AddSongFromProps) => {
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
        console.log(song)
        await PostTrack(song);
        props.refreshSong();

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
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Duration: <input
                            type="number"
                            name="duration"
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Artist: <select name="artist" required>{
                            artists.map(
                                (a: GetArtist) => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))
                        }</select>
                        <button>Add</button>
                    </label>

                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    )

}

export default AddSongForm;