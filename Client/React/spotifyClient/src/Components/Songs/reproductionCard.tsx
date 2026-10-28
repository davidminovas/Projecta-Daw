import type { reproductionCardProps } from "./reproductionCard/reproductionCardProps";

const ReproductionCard = (props: reproductionCardProps) => {



    function incrementSong() {
        props.augment();
    }






    return (
        <>
            <button onClick={() => incrementSong()}>+</button>
            <p>{props.reproductionInfo.volum}</p>
            <button></button>
        </>
    )
}

export default ReproductionCard