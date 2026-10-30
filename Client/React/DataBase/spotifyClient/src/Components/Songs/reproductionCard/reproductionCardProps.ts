import type { reproductionView } from "./reproductionView";

export interface reproductionCardProps {

    reproductionInfo: reproductionView;
    augment: () => void;
    disminuir: () => void;
    stop: () => void;
    hasPlayed: boolean;



}