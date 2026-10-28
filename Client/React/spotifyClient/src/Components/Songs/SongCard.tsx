import { useState } from "react";
import type { SongCardProps } from "./Types/songCardProps"
import like from "../../assets/like.jpg"
import dislike from "../../assets/dislike.jpg"
import type { likeView } from "./Types/likeView";

const SongCerd = (props: SongCardProps) => {



    function handeleClickPlay() {
        props.play();
    }

    const [isLiked, setIsLiked] = useState<likeView>({
        totalLikes: 0,
        like: false
    });

    function handelClickLike() {
        props.like();
    }


    return (
        <>
            <h1> {props.trackInfo.tittle}</h1>
            <p>{props.trackInfo.artist}</p>
            <p> duration: {props.trackInfo.duration}</p>
            <p> Total reproducio: {props.trackInfo.totalReproduction}</p>
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
