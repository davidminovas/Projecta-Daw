import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./interfaces/data/track/tracks";
import { TrackBD } from "./interfaces/track/trackBD";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./interfaces/data/track/artists.data";
import { CountryBD } from "./interfaces/country/countryBD";
import { Countrys } from "./interfaces/data/country/dataCountrys";
import { UserBD } from "./interfaces/user/userBD";
import { Users } from "./interfaces/data/user/dataUser";
import { createTrack, deleteTrack, getAllTracks, getTrackById, substitTrack } from "./serveis/trackService";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSucessServide";
import { PutSuccessService } from "./interfaces/error/putSucessServidee";
import { DeletSuccessService } from "./interfaces/error/deletSuccessServes";
import { createArtist, deleteArtist, getArtistById, substitArtist } from "./serveis/artistService";
import { createCountry, getCountryById, substitCountry } from "./serveis/countryService";
import { createUser, deleteUser, getUserById, substitUser } from "./serveis/userService";
import { HistoryBD } from "./interfaces/history/historyBD";
import { PlayListBd } from "./interfaces/playList/playListBD";
import { PlayLists } from "./interfaces/data/playList/playLists";
import { createPlayList, deletePlayList, getPlayListById, substitPlayList } from "./serveis/playListService";
import { deleteTrackByIdController, getAllTracksController, getTrackByIdController, postTrackByIdController, putTrackByIdController } from "./controllers/tracksController";
import { trackRouter } from "./rutes/trackRutes";
import { artistRouter } from "./rutes/artistRutes";
import { countryRouter } from "./rutes/countryRutes";
import { userRouter } from "./rutes/userRutes";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});


app.use("/tracks", trackRouter);
app.use("/artists", artistRouter);
app.use("/countrys", countryRouter);
app.use("/users", userRouter);


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


app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});


app.post("/historys", (req: Request, res: Response) => {

    const result: CreateSuccessService<HistoryBD> | ErrorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    Historys.push((result as CreateSuccessService<HistoryBD>).data);
    return res.status(result.code).json(result)
});












app.post("/playLists", (req: Request, res: Response) => {

    const result: CreateSuccessService<PlayListBd> | ErrorService = createPlayList(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    PlayLists.push((result as CreateSuccessService<PlayListBd>).data);
    return res.status(result.code).json(result)
});

app.get("/playLists/:id", (req: Request, res: Response) => { // _req → petició rebuda però no utilitzada

    const findPlayList: PlayListBd | undefined = getPlayListById(req.params.id as string)

    if (findPlayList) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findPlayList);
});

app.put("/playLists/:id", (req: Request, res: Response) => {


    const result: PutSuccessService<PlayListBd> | ErrorService = substitPlayList(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<PlayListBd>).index;
    PlayLists[index] = (result as PutSuccessService<PlayListBd>).data;

    return res.status(result.code).json(result)
});
app.delete("/playLists/:id", (req: Request, res: Response) => {

    const result: DeletSuccessService | ErrorService = deletePlayList(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    PlayLists.splice(index, 1)

    return res.status(result.code).json(result)
});

