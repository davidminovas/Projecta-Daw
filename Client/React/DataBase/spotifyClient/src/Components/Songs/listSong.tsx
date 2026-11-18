import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track"
import SongRow from "./SongRow"
import type { SongListProps } from "./Types/songListProps"



const ListSongs = (props: SongListProps) => {


    return (
        <>
            {
                props.tracks.map(
                    (t: GetTrack) => {
                        return <SongRow
                            key={t.id}
                            id={t.id}
                            tittle={t.title}
                            artist={t.artist}
                            artist_id={t.artist_id}
                            duration={t.duration}
                            edit={props.edit}
                        />
                    }
                )
            }
        </>
    )
}

export default ListSongs