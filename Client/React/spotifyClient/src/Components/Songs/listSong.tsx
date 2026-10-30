import SongRow from "./SongRow"
import type { SongListProps } from "./Types/songListProps"
import type { TrackListView } from "./Types/tracksListView"


const ListSongs = (props: SongListProps ) => {


    return (
        <>
            {
                props.tracks.map(
                    (t: TrackListView) => {
                        return <SongRow
                            key={t.id}
                            tittle={t.tittle}
                            artist={t.artist}
                            duration={t.duration}
                        />
                    }
                )
            }
        </>
    )
}

export default ListSongs