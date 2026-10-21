import type { SongCardProps } from "./Types/songCardProps"



const SongCerd = (props:SongCardProps) => {
    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> {props.trackInfo.duration}</p>
        </>
    )
}
export default SongCerd