import type { Canco } from "../interface/track";
export function createRowSong(track: Canco): HTMLTableRowElement {

    const tr: HTMLTableRowElement = document.createElement("tr");
    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = track.titol;

    const durationTd: HTMLTableCellElement = document.createElement("td");
    durationTd.textContent = track.durada.toString();

    const artistTd: HTMLTableCellElement = document.createElement("td");
    artistTd.textContent = track.artista;
    tr.appendChild(titleTd);
    tr.appendChild(durationTd);

    titleTd.addEventListener("click",
        () => {

            console.log(getIdTrack(track));
        }
    )
    durationTd.addEventListener("click",
        () => {

            console.log(getIdTrack(track));
        }
    )

    return tr;
}

function getIdTrack(track:Canco):string {
    return track.id
}