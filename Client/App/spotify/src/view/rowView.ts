import type { Canco } from "../interface/track";
import { crearBotoPlay } from "./bottonPlay/createBottonPlay";
export function createRowSong(track: Canco, getIdCanco: (id: string) => void): HTMLTableRowElement {

    const tr: HTMLTableRowElement = document.createElement("tr");
    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.titol;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.durada.toString();


    const reproduccions: HTMLTableCellElement = document.createElement("td");
    reproduccions.textContent = track.reproduction.toString();
    const bottonReproductions: HTMLButtonElement = crearBotoPlay(track,reproduccions);

    const artistTd: HTMLTableCellElement = document.createElement("td");
    artistTd.textContent = track.artista;
    tr.appendChild(titleTd);
    tr.appendChild(durationTd);
    tr.appendChild(bottonReproductions);
    tr.appendChild(reproduccions)

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