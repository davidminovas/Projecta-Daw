import type { Canco } from "../interface/track";
import { crearBotoPlay } from "./bottonPlay/createBottonPlay";
export function createRowSong(track: Canco, getIdCanco: (id: string) => void): HTMLTableRowElement {

    const tr: HTMLTableRowElement = document.createElement("tr");
    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.titol;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.durada.toString();

    const botoRepTd: HTMLButtonElement = crearBotoPlay();

    const artistTd: HTMLTableCellElement = document.createElement("td");
    artistTd.textContent = track.artista;
    tr.appendChild(titleTd);
    tr.appendChild(durationTd);
    tr.appendChild(botoRepTd);

    titleTd.addEventListener("click",
        () => {
            getIdTrack(track);
            getIdCanco(track.id);
        }
    )
    durationTd.addEventListener("click",
        () => {
            getIdTrack(track);
            getIdCanco(track.id);
        }
    )

    return tr;
}

function getIdTrack(track: Canco): string {
    return track.id
}