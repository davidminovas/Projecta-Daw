import { TrackBD } from "../track/trackBD";

export interface PutSuccessService<T> {
    success: boolean;
    code: number;
    data: T;
    
}