import type { SongCardProps } from "./Types/songCardProps"



const SongCerd = (props:SongCardProps) => {
    return (
        <>
            <h1> {props.tittle}</h1>
            <p>{props.artist}</p>
            <p> {props.duration}</p>
        </>
    )
}
export default SongCerd