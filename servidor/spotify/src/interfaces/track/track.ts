export interface Track {
    id: string;
    title: string;
    artist: string;
    duration: {
        minuts: number;
        seconds: number;
        miliseconds?: number;
    };
}