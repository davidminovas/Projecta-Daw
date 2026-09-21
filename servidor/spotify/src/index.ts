import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./interfaces/data/track/track";

const port: number = 3000;

const app: Express = express();

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(tracks);
});



app.get("/tracks", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});







app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});