import { tracks } from "../../Data/track/tracks"
import type { Track } from "../../Model/Track"
import SongRow from "./SongRow"
import type { SongListProps } from "./Types/songListProps"


const ListSongs = (props: SongListProps ) => {


    return (
        props.tracks.map(
            (t: Track) => {
                return <SongRow
                     key={t.id}
                     tittle={t.tittle}
                     artist={t.artist}
                      duration={t.duration}
                 />
            }
        ) 
    )
}

export default ListSongs