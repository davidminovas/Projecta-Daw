import type { Track } from "../../Model/Track";
import type { SongRowProps } from "./Types/SongRowProps"

const SongRow = (props: SongRowProps) => {
    function edit() {
        if (!props.edit) {
            return;
        }

        const song: Track = {
            id: props.id,
            artis_name: props.artist,
            artist_id: props.artist_id,
            duration: props.duration,
            tittle: props.tittle
        };
        props.edit(song);
    }

    return (
        <tr>
            <td> {props.tittle}</td>
            <td>{props.artist}</td>
            <td> duration: {props.duration}</td>
            <td><button>Play</button></td>
            {props.edit && <td><button type="button" onClick={edit}>Edit</button></td>}
        </tr>
    )
}

export default SongRow