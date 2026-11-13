
import type { PlaylistCardProps } from "./Types/PlayListCardProps";


const PlaylistCard = ({ playlists }: PlaylistCardProps) => {
    return (
        <section>
            <h2>Playlists</h2>
            {playlists.map((playlist) => (
                <article key={playlist.id}>
                    <h3>{playlist.title}</h3>
                    <button >Mostra les cançons</button>
                </article>
            ))}
        </section>
    );
};

export default PlaylistCard;