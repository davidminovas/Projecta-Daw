
import { useState } from "react";
import { ENV } from "../../config/env";
import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../Songs/listSong";
import type { PlaylistCardProps } from "./Types/PlayListCardProps";

const PlaylistCard = ({ playlists }: PlaylistCardProps) => {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [loadingPlaylistId, setLoadingPlaylistId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function showTracks(playlistId: string) {
        if (selectedPlaylistId === playlistId) {
            setSelectedPlaylistId(null);
            return;
        }

        setLoadingPlaylistId(playlistId);
        setSelectedPlaylistId(null);
        setError(null);

        try {
            const response = await fetch(
                `${ENV.API_BASE_URL}/playList/${playlistId}/tracks`
            );
            if (!response.ok) {
                throw new Error("No s'han pogut carregar les cançons.");
            }

            const playlistTracks: GetTrack[] = await response.json();
            setTracks(playlistTracks);
            setSelectedPlaylistId(playlistId);
        } catch (caught: unknown) {
            setError(caught instanceof Error
                ? caught.message
                : "Error carregant les cançons de la llista.");
        } finally {
            setLoadingPlaylistId(null);
        }
    }

    return (
        <section>
            <h2>Playlists</h2>
            {playlists.map((playlist) => (
                <article key={playlist.id}>
                    <h3>{playlist.title}</h3>
                    <button
                        type="button"
                        disabled={loadingPlaylistId !== null}
                        onClick={() => void showTracks(playlist.id)}
                    >
                        {loadingPlaylistId === playlist.id
                            ? "Carregant..."
                            : selectedPlaylistId === playlist.id
                                ? "Amaga les cançons"
                                : "Mostra les cançons"}
                    </button>
                    {selectedPlaylistId === playlist.id && (
                        tracks.length > 0
                            ? <table><tbody><ListSongs tracks={tracks} /></tbody></table>
                            : <p>Aquesta llista no té cançons.</p>
                    )}
                </article>
            ))}
            {error && <p role="alert">{error}</p>}
        </section>
    );
};

export default PlaylistCard;