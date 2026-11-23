import { useState } from "react";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TtrackCreate";
import AddSongForm from "../../Components/Songs/AddSongForm";
import { ENV } from "../../config/env";

const Artist = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    async function addSong(song: TrackCreate) {
        try {
            const response = await fetch(`${ENV.API_BASE_URL}/tracks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(song),
            });

            if (!response.ok) throw new Error("No s'ha pogut afegir la cançó");

            setShowForm(false);
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    return (
        <main>
            <h1>Artista</h1>
            <button type="button" onClick={() => {
                setShowForm(true);
                setError("");
            }}>Add</button>

            {error && <p role="alert">{error}</p>}

            {showForm && (
                <>
                    <AddSongForm submit={addSong} />
                    <button type="button" onClick={() => setShowForm(false)}>
                        Cancel·la
                    </button>
                </>
            )}
        </main>
    );
};

export default Artist;