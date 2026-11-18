import { useEffect, useState } from "react";
import type { GetTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../../Components/Songs/listSong"
import type { reproductionView } from "../../Components/Songs/reproductionCard/reproductionView";
import { ENV } from "../../config/env";
import type { GETPlaylist } from "../../APIManagement/PlayList/Interface/playList";
import type { trackView } from "../../Components/Songs/Types/trackView";
import AddSongForm from "../../Components/Songs/AddSongForm";
import type { FormState } from "./Types/FormState";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TtrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import { PutTrack } from "../../APIManagement/Tracks/PutTrack";

const SongManagement = () => {
    const [playlists, setPlaylist] = useState<GETPlaylist[]>([]);
    const [tracks, setTracks] = useState<GetTrack[]>([]);
    const [newSong, setNewSong] = useState<FormState>({ mode: "none" });
    const [track, setTrack] = useState<trackView>(
        {
            ...tracks[(Math.floor(Math.random() * tracks.length))],
            totalReproduction: Math.floor(Math.random() * 1000),
            likes: {
                like: true,
                totalLikes: 100

            }
        }
    );
    async function chargeTrack() {
        const resposta = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GetTrack[] = await resposta.json();
        console.log(listTrack)
        setTracks(listTrack);
        setNewSong({ mode: "none" })



        const initialTrack = listTrack[0];

        setTrack({
            ...initialTrack,
            totalReproduction: 0,
            likes: {
                like: false,
                totalLikes: 0,
            },
        });

        setReproduction(prev => ({
            ...prev,
            title: initialTrack.title,
        }));
    }
    useEffect(
        () => {
            chargeTrack();
            carregarDadesPlaylist();
        }, []);

    const [reproduction, setReproduction] = useState<reproductionView>(
        {
            volum: 0,
            title: track.title,
        }
    );
    async function carregarDadesPlaylist() {

        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/playList`);
        const listPlaylist: GETPlaylist[] = await resposta.json() as GETPlaylist[];
        setPlaylist(listPlaylist);
    }
    function addSong() {
        setNewSong({ mode: "new" });
    }
    function edit(t: Track) {
        setNewSong({
            mode: "edit",
            song: t,
        });
    }
    async function save(t: TrackCreate) {
        await PostTrack(t)
        await chargeTrack()
        setNewSong({ mode: "none" })
    }

    async function update(t: TrackCreate) {
        const id = newSong.mode == "edit" ? newSong.song.id : "";
        await PutTrack(t, id);
        await chargeTrack()
        setNewSong({ mode: "none" })
    }
    return (
        <>
            <main>
                <h1>hola</h1>

                {
                    tracks.length > 0
                        ? <>
                            <table>
                                <thead>
                                    <title></title>
                                </thead>
                                <tbody>
                                    <ListSongs tracks={tracks} edit={edit} />
                                </tbody>
                            </table>
                        </>
                        : <></>

                }

            </main>
            {
                newSong.mode === "new"
                    ? <AddSongForm submit={(t) => save(t)} />
                    : newSong.mode === "edit"
                        ? <AddSongForm submit={(t) => update(t)} song={newSong.song} />
                        : <button onClick={addSong}>New</button>
            }
        </>
    )
}
export default SongManagement