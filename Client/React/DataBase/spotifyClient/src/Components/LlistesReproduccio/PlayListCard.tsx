
import { useState } from "react";
import { ENV } from "../../config/env";
import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../Songs/listSong";
import type { PlaylistCardProps } from "./Types/PlayListCardProps";

interface PlaylistTrack {
    playlist_id: string;
    track_id: string;
}

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
            const [relationsResponse, tracksResponse] = await Promise.all([
                fetch(`${ENV.API_BASE_URL}/playListTracks/${playlistId}`),
                fetch(`${ENV.API_BASE_URL}/tracks`),
            ]);
            if (!relationsResponse.ok || !tracksResponse.ok) {
                throw new Error("No s'han pogut carregar les cançons.");
            }

            const relations: PlaylistTrack[] = await relationsResponse.json();
            const allTracks: GetTrack[] = await tracksResponse.json();
            const trackIds = new Set(
                relations
                    .filter(relation => relation.playlist_id.toLowerCase() === playlistId.toLowerCase())
                    .map(relation => relation.track_id.toLowerCase())
            );
            const playlistTracks = allTracks.filter(track => trackIds.has(track.id.toLowerCase()));

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