import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./interfaces/data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/track.validator";
import { randomUUID } from "crypto";




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
        duration: track.duration
    };





    return res.status(201).json(trackRecord)
});


app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});

