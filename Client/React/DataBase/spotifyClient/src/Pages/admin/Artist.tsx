import { useState } from "react";
import type { GetArtist } from "../../APIManagement/Artist/interfices/Artist";
import { ENV } from "../../config/env";


const Artist = () => {

    type ListAction = "edit" | "delete";
    const [showForm, setShowForm] = useState(false);
    const [showTracks, setShowArtist] = useState(false);
    const [listAction, setListAction] = useState<ListAction>("edit");
    const [tracks, setArtist] = useState<GetArtist[]>([]);
    // const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
    const [error, setError] = useState("");


    async function loadArtist() {
        try {
            const response = await fetch(`${ENV.API_BASE_URL}/tracks`);
            if (!response.ok) throw new Error("No s'han pogut carregar les cançons");

            const list: GetArtist[] = await response.json();
            setArtist(list);
            setShowArtist(true);
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }


























    return (
        <>
            <main>
                <h1>Artista</h1>
                <button type="button" onClick={() => {
                    setEditingArtist(null);
                    setShowArtist(false);
                    setShowForm(true);
                    setError("");
                }}>Add</button>
                <button type="button" onClick={() => {
                    setListAction("edit");
                    loadArtist();
                }}>Update</button>
                <button type="button" onClick={() => {
                    setListAction("delete");
                    loadArtist();
                }}>Delete</button>

                {error && <p role="alert">{error}</p>}

                {/* {showArtist && (
                    <ul>
                        {artist.map(artist => (
                            <li key={artist.id}>
                                {artist.title} — {artist.artist} ({artist.duration})
                                <button type="button" onClick={() => {
                                    if (listAction === "edit") editSong(artist);
                                    else deleteSong(artist.id);
                                }}>
                                    {listAction === "edit" ? "Edit" : "Delete"}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {showForm && (
                    <>
                        <button type="button" onClick={() => {
                            setShowForm(false);
                            setEditingArtist(null);
                        }}>
                            Cancel·la
                        </button>
                    </>
                )} */}
            </main>
        </>
    );
};

export default Artist;