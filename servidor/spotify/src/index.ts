import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./interfaces/data/track/tracks";
import { TrackBD } from "./interfaces/track/trackBD";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";
import { Artist } from "./interfaces/artist/artist";
import { validatorArtistCountry } from "./validators/artists.validator";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./interfaces/data/track/artists.data";
import { Country } from "./interfaces/country/country";
import { CountryBD } from "./interfaces/country/countryBD";
import { COUNTRYS } from "./interfaces/data/track/pais.data";
import { Countrys } from "./interfaces/country/dataCountrys";
import { isValidCountry } from "./interfaces/country/countryValidator";




const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(tracks);
});



app.get("/tracks/:id", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(tracks);
});


app.get("/tracks/:id", (req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    const idTrack: string = req.params.id as string;
    const track: TrackBD[] = tracks.filter(
        (t: TrackBD) => { return t.id === idTrack }
    );
    if (track.length === 0) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(track);
});


/**
 * Saber totes les llistes de reproduccio d'un usuari:
 * 
 * /usuari/:id/playlists
 * 
 * Les ultimes cançons que ha escoltat un usuari:
 * /usuari/:id/song/latest
 * /usuari/:id/historial
 * 
 * Les ulitimes cançons que s'han carregat a l'aplicatiu:
 * /songs/uploaded/latest
 * 
 * Totes les cançons d'una playlist d'un usuari:
 * /usuaris/:id/playlist/:idPlaylist/songs
 * 
 * El meu perfil
 * /usuaris/profile(me)
 * 
 * El perfil d'un altre usuari
 * /usuaris/:id/profile
 *
 * Musica mes reproduida
 * /songs/popular
 * 
 * Musica mes reproduida d'un artista
 * 
 * /artist/:id/songs/popular
 * 
 */

app.post("/tracks", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: " Invalid data" });
    }
    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration,

    };



    tracks.push(trackRecord);

    return res.status(201).json(trackRecord)
});


app.get("/artists/:id", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(artists);
});


app.post("/artista", (req: Request, res: Response) => {
    const artist: Artist = req.body;
    if (!validatorArtistCountry(artist)) {
        return res.status(400).json({ message: " Invalid data" });
    }


    const artisRecord: ArtistBD = {
        id: artist.id,
        artisticName: artist.artisticName.trim().replace(/\s+/g, " "),
        name: artist.name.trim().replace(/\s+/g, " "),
        country: artist.country,
    };

    artists.push(artisRecord);

    return res.status(201).json(artisRecord)
});


app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});

app.put("/tracks/:id", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: " Invalid data" });
    }
    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack; }
    );
    if (index === -1) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }


    tracks[index] = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist.trim().replace(/\s+/g, " "),
        duration: track.duration
    };

    return res.status(201).json(tracks[index])
});



app.delete("/tracks/:id", (req: Request, res: Response) => {

    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex((t: TrackBD) => { return t.id === idTrack; }
    );
    if (index === -1) {
        return res.status(404).json({ message: 'Track not found' })
    }

    tracks.splice(index, 1)

    return res.status(204).json({ message: 'Track delete' })
});



app.post("/country", (req: Request, res: Response) => {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: " Invalid data" });
    }
    const uuid: string = randomUUID();

    const countryRecord: CountryBD = {
        id: uuid,
        name: country.name.trim().replace(/\s+/g, " "),
    };


    Countrys.push(countryRecord);

    return res.status(201).json(countryRecord)
});


app.get("/country/:id", (req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    const idCountry: string = req.params.id as string;
    const country: CountryBD[] = Countrys.filter(
        (t: Country) => { return t.id === idCountry }
    );
    if (country.length === 0) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(country);
});

app.put("/country/:id", (req: Request, res: Response) => {
    const country: Country = req.body;
    if (!isValidCountry(country)) {
        return res.status(400).json({ message: " Invalid data" });
    }
    const idCountry: string = req.params.id as string;
    const index: number = Countrys.findIndex(
        (t: CountryBD) => { return t.id === idCountry; }
    );
    if (index === -1) {
        return res.status(404).json({ message: 'Track ${idCountry} not found' })
    }


    Countrys[index] = {
        id: idCountry,
        name: country.name.trim().replace(/\s+/g, " "),
    };

    return res.status(201).json(Countrys[index])
});