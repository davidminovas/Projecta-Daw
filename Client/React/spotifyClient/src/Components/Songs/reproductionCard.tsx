import type { reproductionCardProps } from "./reproductionCard/reproductionCardProps";

const ReproductionCard = (props: reproductionCardProps) => {



    function incrementSong() {
        props.augment();
    }
    function disminuirSong() {
        props.disminuir();
    }
    function stopSong() {
        props.stop();
    }







    return (
        <>
            <button onClick={() => incrementSong()}>+</button>
            <p>{props.reproductionInfo.volum}</p>
            <button onClick={() => disminuirSong()}>-</button>
            {props.hasPlayed && <p>play song</p>}{!props.hasPlayed && <p>play not song</p>}
            {props.hasPlayed && <p>{props.reproductionInfo.title}</p>}
            {props.hasPlayed && <button onClick={() => stopSong()}>Stop</button>}
        </>
    )
}

export default ReproductionCard