import { useState } from "react";
import type { SongCardProps } from "./Types/songCardProps"
import like from "../../assets/like.jpg"
import dislike from "../../assets/dislike.jpg"

const SongCerd = (props: SongCardProps) => {

    let [totalReproduction, setTotalReproduccions] = useState<number>(props.trackInfo.totalReproduction);

    function handeleClickPlay(numer: number) {
        const tr = (prev: number) => { return prev + numer }
        setTotalReproduccions(tr);
        console.log(tr)
    }

    const [isLiked, setIsLiked] = useState(false);;

    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> duration: {props.trackInfo.duration}</p>
            <p> Total reproducio: {totalReproduction}</p>
            <img
                className="song-reaction-image"
                src={isLiked ? like : dislike}
                onClick={() => setIsLiked(previous => !previous)}
            />
            <p><button onClick={() => handeleClickPlay(1)}>Play 1</button></p>
            <p><button onClick={() => handeleClickPlay(5)}>Play 5</button></p>
            <p><button onClick={() => handeleClickPlay(10)}>Play 10</button></p>
        </>
    )
}

export default SongCerd
