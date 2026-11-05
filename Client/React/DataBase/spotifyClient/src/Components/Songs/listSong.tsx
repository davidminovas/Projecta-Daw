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
                            tittle={t.title}
                            artist={t.artist}
                            duration={props.time(t.duration)}
                        />
                    }
                )
            }
        </>
    )
}

export default ListSongs