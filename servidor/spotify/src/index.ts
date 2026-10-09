import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { ErrorService } from "./interfaces/error/errorService";
import { CreateSuccessService } from "./interfaces/error/createSucessServide";
import { HistoryBD } from "./interfaces/history/historyBD";
import { trackRouter } from "./rutes/trackRutes";
import { artistRouter } from "./rutes/artistRutes";
import { countryRouter } from "./rutes/countryRutes";
import { userRouter } from "./rutes/userRutes";
import { playListRouter } from "./rutes/playListRutes";


const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});


app.use("/tracks", trackRouter);
app.use("/artists", artistRouter);
app.use("/countrys", countryRouter);
app.use("/users", userRouter);
app.use("/playList", playListRouter);


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



