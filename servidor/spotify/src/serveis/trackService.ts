import { randomUUID } from "crypto";
import { tracks } from "../interfaces/data/track/tracks";
import { Track } from "../interfaces/track/track";
import { TrackBD } from "../interfaces/track/trackBD";
import { isValidTrack } from "../validators/track.validator";
import { ErrorService } from "../interfaces/error/errorService";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";

export function getAllTracks(): TrackBD[] {
    return tracks;
}

export function getTrackById(idTrack: string): TrackBD | undefined {

    return tracks.find(
        (t: TrackBD) => { return t.id === idTrack }
    );

}

export function createTrack(track: Track): CreateSuccessService<TrackBD> | ErrorService {

    if (!isValidTrack(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration,

    };

    return { success: true, code: 201, data: trackRecord }
}

export function substitTrack(track: TrackBD): PutSuccessService<TrackBD> | ErrorService {
    const idTrack: string = track.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "Track ${idTrack} not found" }
    }

    const trackBD: TrackBD = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return { success: true, code: 201, data: trackBD }
}