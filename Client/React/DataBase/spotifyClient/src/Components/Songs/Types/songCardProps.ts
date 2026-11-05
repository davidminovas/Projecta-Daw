

import type { trackView } from "./trackView";

export interface SongCardProps {

    trackInfo: trackView;
    play: () => void;
    like: () => void;
    reset: () => void;
    minut: (duration: number) => number;
    second: (duration: number) => number;


}