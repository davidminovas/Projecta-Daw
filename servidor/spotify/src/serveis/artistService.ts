import { randomUUID } from "crypto";
import { Artist } from "../interfaces/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorArtistCountry } from "../validators/artists.validator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";

export function getAllTArtists(): ArtistBD[] {
    return artists;
}

export function getArtistById(idTrack: string): ArtistBD | undefined {

    return artists.find(
        (t: ArtistBD) => { return t.id === idTrack }
    );

};

export function createArtist(artist: Artist): CreateSuccessService<ArtistBD> | ErrorService {

    if (!validatorArtistCountry(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const artisRecord: ArtistBD = {
        id: uuid,
        artisticName: artist.artisticName.trim().replace(/\s+/g, " "),
        name: artist.name.trim().replace(/\s+/g, " "),
        country: artist.country,
    };

    artists.push(artisRecord);

    return { success: true, code: 201, data: artisRecord }
}

export function substitArtist(artist: Artist, idArtist: string): PutSuccessService<ArtistBD> | ErrorService {


    if (!validatorArtistCountry(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = artists.findIndex(
        (t: ArtistBD) => { return t.id === idArtist; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: ArtistBD = {
        id: idArtist,
        artisticName: artist.artisticName.trim().replace(/\s+/g, " "),
        name: artist.name.trim().replace(/\s+/g, " "),
        country: artist.country,
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}

export function deleteArtist(idArtist: string): DeletSuccessService | ErrorService {

    const index: number = artists.findIndex((t: ArtistBD) => { return t.id === idArtist; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    return { success: true, code: 204, index: index };
}