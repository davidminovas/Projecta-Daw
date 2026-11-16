import { useEffect, useState } from "react";
import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import { ENV } from "../../config/env";
import type { trackView } from "./Types/trackView";
import type { GetArtist } from "../../APIManagement/Artist/interfices/Artist";

const AddSongForm = () => {
    const [artists, setArtist] = useState<GetArtist[]>([]);
    
    async function chargeTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listArtist: GetArtist[] = await resposta.json() as GetArtist[];

        setArtist(listArtist);

        if (listArtist.length === 0) {
            return;
        }
    }
    useEffect(
        () => {
            chargeTrack();
        }, []
    );
    return (
        <>
            <h1>Afegir canço</h1>
            <form>
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
                                    <option key={a.id} value={a.id}>{a.name }</option>
                        ))
                        }</select>
                    </label>
                    <button>Add</button>
                </p>

            </form>
        </>
    )

}

export default AddSongForm;