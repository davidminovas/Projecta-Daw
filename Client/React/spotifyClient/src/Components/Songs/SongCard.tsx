import { useState } from "react";
import type { SongCardProps } from "./Types/songCardProps"
import like from "../../assets/like.jpg"
import dislike from "../../assets/dislike.jpg"
import type { likeView } from "./Types/likeView";

const SongCerd = (props: SongCardProps) => {

    let [totalReproduction, setTotalReproduccions] = useState<number>(props.trackInfo.totalReproduction);

    function handeleClickPlay() {
        const tr = (prev: number) => { return prev + 1 }
        setTotalReproduccions(tr);
    }

    const [isLiked, setIsLiked] = useState<likeView>({
        totalLikes: 0,
        like: false
    });

    function handelClickLike() {
        setIsLiked(previous => {
            const like = !previous.like;

            return {
                like,
                totalLikes: Math.max(
                    0,
                    previous.totalLikes + (like ? 1 : -1)
                )
            };
        });
    }


    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> duration: {props.trackInfo.duration}</p>
            <p> Total reproducio: {totalReproduction}</p>
            <p>
                <img
                    className="song-reaction-image"
                    src={isLiked.like ? like : dislike}
                    onClick={() =>
                        handelClickLike()
                    }
                />
                {isLiked.totalLikes}
            </p>
            <p><button onClick={() => handeleClickPlay()}>Play</button></p>
        </>
    )
}

export default SongCerd
