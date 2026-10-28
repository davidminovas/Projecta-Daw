import type { SongCardProps } from "./Types/songCardProps"
import like from "../../assets/like.jpg"
import dislike from "../../assets/dislike.jpg"


const SongCerd = (props: SongCardProps) => {



    function handeleClickPlay() {
        props.play();
    }


    function handelClickLike() {
        props.like();
    }
    function handelClickReset() {
        props.reset();
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
                    src={props.trackInfo.likes.like ? like : dislike}
                    onClick={() =>
                        handelClickLike()
                    }
                />
                {props.trackInfo.likes.totalLikes}
            </p>
            <p><button onClick={() => handeleClickPlay()}>Play</button></p>
            <p><button onClick={()=> handelClickReset()}>Reset</button></p>
        </>
    )
}

export default SongCerd
