import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRouter } from "./rutes/trackRutes";
import { artistRouter } from "./rutes/artistRutes";
import { countryRouter } from "./rutes/countryRutes";
import { userRouter } from "./rutes/userRutes";
import { playListRouter } from "./rutes/playListRutes";


export const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});


app.use("/tracks", trackRouter);
app.use("/artists", artistRouter);
app.use("/countrys", countryRouter);
app.use("/users", userRouter);
app.use("/playList", playListRouter);
