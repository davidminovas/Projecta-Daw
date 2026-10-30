import type { SongRowProps } from "./Types/SongRowProps"

const SongRow = (props: SongRowProps ) => {


    return (
        <tr>
            <td> {props.tittle}</td>
            <td>{props.artist}</td>
            <td> duration: {props.duration}</td>
           
        </tr>
    )
}

export default SongRow