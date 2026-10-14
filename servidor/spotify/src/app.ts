import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRuter } from "./rutes/trackRutes";
import { artistRuter } from "./rutes/artistRutes";
import { countryRuter } from "./rutes/countryRutes";
import { userRuter } from "./rutes/userRutes";
import { playListRuter } from "./rutes/playListRutes";
import { historyRuter } from "./rutes/historyRutes";
import { playListTrackRuter } from "./rutes/playListTracksRutes";
import { albumRuter } from "./rutes/albumRutes";


export const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});


app.use("/tracks", trackRuter);
app.use("/artists", artistRuter);
app.use("/countrys", countryRuter);
app.use("/users", userRuter);
app.use("/playList", playListRuter);
app.use("/historys", historyRuter);
app.use("/playListTracks", playListTrackRuter);
app.use("/albums", albumRuter);