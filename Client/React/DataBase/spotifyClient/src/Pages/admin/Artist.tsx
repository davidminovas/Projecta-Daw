import { useState } from "react";
import type { GetArtist } from "../../APIManagement/Artist/interfices/Artist";
import { ENV } from "../../config/env";
import type { Artist } from "../../Model/Artist";
import AddArtistForm from "../../Components/Artists/AddArtistForm";
import type { ArtistCreate } from "../../APIManagement/Artist/interfices/ArtistCreate";


const Artist = () => {

    type ListAction = "edit" | "delete";
    const [showForm, setShowForm] = useState(false);
    const [showArtists, setShowArtist] = useState(false);
    const [listAction, setListAction] = useState<ListAction>("edit");
    const [artists, setArtist] = useState<GetArtist[]>([]);
    const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
    const [error, setError] = useState("");


    async function loadArtist() {
        try {
            const response = await fetch(`${ENV.API_BASE_URL}/artists`);
            if (!response.ok) throw new Error("No s'han pogut carregar les cançons");

            const list: GetArtist[] = await response.json();
            setArtist(list);
            setShowArtist(true);
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    async function saveArtist(song: ArtistCreate) {
        try {
            const isEditing = editingArtist !== null;
            const url = isEditing
                ? `${ENV.API_BASE_URL}/artists/${editingArtist.id}`
                : `${ENV.API_BASE_URL}/artists`;
            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(song),
            });

            if (!response.ok) {
                throw new Error(isEditing
                    ? "No s'ha pogut modificar l'artista"
                    : "No s'ha pogut afegir l'artista");
            }

            setShowForm(false);
            setEditingArtist(null);
            setError("");
            if (isEditing) {
                await loadArtist();
            } else {
                setShowArtist(false);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error inesperat");
        }
    }

    function editArtist(track: GetArtist) {
        setEditingArtist({
            id: track.id,
            name: track.name,
            pseudonym: track.pseudonym,
            country_id: track.country_id
        });
        setShowArtist(false);
        setShowForm(true);
        setError("");
    }





















    return (
        <main>
            <h1>Artist</h1>
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

            {showArtists && (
                <ul>
                    {artists.map(artist => (
                        <li key={artist.id}>
                            {artist.name} — {artist.country_id} — {artist.pseudonym}
                            <button type="button" onClick={() => {
                                if (listAction === "edit") editArtist(artist);
                                else deleteArtist(artist.id);
                            }}>
                                {listAction === "edit" ? "Edit" : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {showForm && (
                <>
                    <AddArtistForm artist={editingArtist ?? undefined} submit={saveArtist} />
                    <button type="button" onClick={() => {
                        setShowForm(false);
                        setEditingArtist(null);
                    }}>
                        Cancel·la
                    </button>
                </>
            )}
        </main>
    );
};

export default Artist;