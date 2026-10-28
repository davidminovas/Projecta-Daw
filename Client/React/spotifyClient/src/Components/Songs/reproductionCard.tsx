import type { reproductionCardProps } from "./reproductionCard/reproductionCardProps";

const ReproductionCard = (props: reproductionCardProps) => {



    function incrementSong() {
        props.augment();
    }
    function disminuirSong() {
        props.disminuir();
    }







    return (
        <>
            <button onClick={() => incrementSong()}>+</button>
            <p>{props.reproductionInfo.volum}</p>
            <button onClick={() => disminuirSong()}>-</button>
            {props.hasPlayed && <p>play song</p>}{!props.hasPlayed && <p>play not song</p>}
            {props.hasPlayed && <p>{props.reproductionInfo.title}</p>}
        </>
    )
}

export default ReproductionCard