import type { Like } from "./like";

export interface trackView {

    title: string;
    artist_id: string;
    duration: number;
    totalReproduction: number;
    likes: Like;


}