import type { Like } from "./like";

export interface trackView {

    title: string;
    artist: string;
    duration: number;
    totalReproduction: number;
    likes: Like;


}