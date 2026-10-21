import type { SongCardProps } from "./Types/songCardProps"



const SongCerd = (props:SongCardProps) => {
    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> {"duration:" + props.trackInfo.duration}</p>
            <p>{ "Total reproducio:"+ props.trackInfo.totalReproduction}</p>
        </>
    )
}
export default SongCerd