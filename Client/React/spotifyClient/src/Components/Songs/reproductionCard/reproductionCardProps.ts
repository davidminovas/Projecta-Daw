import type { reproductionView } from "./reproductionView";

export interface reproductionCardProps {

    reproductionInfo: reproductionView;
    augment: () => void;
    disminuir: () => void;
    hasPlayed: boolean;



}