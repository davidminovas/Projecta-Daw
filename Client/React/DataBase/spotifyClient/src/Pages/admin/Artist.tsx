import { useState } from "react";
import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import AddSongForm from "../../Components/Songs/AddSongForm";
import { ENV } from "../../config/env";
import type { Track } from "../../Model/Track";

type ListAction = "edit" | "delete";

const Artist = () => {
    const [showForm, setShowForm] = useState(false);
    const [showTracks, setShowTracks] = useState(false);
    const [listAction, setListAction] = useState<ListAction>("edit");
    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [editingSong, setEditingSong] = useState<Track | null>(null);
    const [error, setError] = useState("");

    async function loadTracks() {
        try {
            const response = await fetch(`${ENV.API_BASE_URL}/tracks`);
            if (!response.ok) throw new Error("No s'han pogut carregar les cançons");

            const list: GetTrack[] = await response.json();
            setTracks(list);
            setShowTracks(true);
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    async function saveSong() {
        try {
            const isEditing = editingSong !== null;

            setShowForm(false);
            setEditingSong(null);
            setError("");
            if (isEditing) {
                await loadTracks();
            } else {
                setShowTracks(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    async function deleteSong(trackId: string) {
        if (!window.confirm("Vols eliminar aquesta cançó?")) return;

        try {
            const response = await fetch(`${ENV.API_BASE_URL}/tracks/${trackId}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("No s'ha pogut eliminar la cançó");

            await loadTracks();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    function editSong(track: GetTrack) {
        setEditingSong({
            id: track.id,
            tittle: track.title,
            artist_id: track.artist_id,
            artis_name: track.artist,
            duration: track.duration,
        });
        setShowTracks(false);
        setShowForm(true);
        setError("");
    }

    return (
        <main>
            <h1>Artista</h1>
            <button type="button" onClick={() => {
                setEditingSong(null);
                setShowTracks(false);
                setShowForm(true);
                setError("");
            }}>Add</button>
            <button type="button" onClick={() => {
                setListAction("edit");
                loadTracks();
            }}>Update</button>
            <button type="button" onClick={() => {
                setListAction("delete");
                loadTracks();
            }}>Delete</button>

            {error && <p role="alert">{error}</p>}

            {showTracks && (
                <ul>
                    {tracks.map(track => (
                        <li key={track.id}>
                            {track.title} — {track.artist} ({track.duration})
                            <button type="button" onClick={() => {
                                if (listAction === "edit") editSong(track);
                                else deleteSong(track.id);
                            }}>
                                {listAction === "edit" ? "Edit" : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {showForm && (
                <>
                    <AddSongForm song={editingSong ?? undefined} submit={saveSong} />
                    <button type="button" onClick={() => {
                        setShowForm(false);
                        setEditingSong(null);
                    }}>
                        Cancel·la
                    </button>
                </>
            )}
        </main>
    );
};

export default Artist;