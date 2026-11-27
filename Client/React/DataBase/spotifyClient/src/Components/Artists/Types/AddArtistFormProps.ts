import type { ArtistCreate } from "../../../APIManagement/Artist/interfices/ArtistCreate";
import type { Artist } from "../../../Model/Artist";

export interface AddArtistFormProps {
    submit: (artist: ArtistCreate) => void;
    artist?: Artist;
}
