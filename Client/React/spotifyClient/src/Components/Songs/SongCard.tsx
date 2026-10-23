import { useState } from "react";
import type { SongCardProps } from "./Types/songCardProps"

const SongCerd = (props: SongCardProps) => {

    const [totalReproduction, setTotalReproduccions] = useState < number >(0);

    function handeleClickPlay() {
        props.trackInfo.totalReproduction += 1;
    }


    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> duration: {  props.trackInfo.duration}</p>
            <p> Total reproducio: {props.trackInfo.totalReproduction}</p>
            <p><button onClick={handeleClickPlay}>Play</button></p>
        </>
    )
}

export default SongCerd