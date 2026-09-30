import type { Canco } from "../interface/track";


export function createTrackChose(canco: Canco): HTMLDivElement {

    const card: HTMLDivElement = document.createElement("div");
    const title: HTMLDivElement = document.createElement("p");
    title.textContent = "Titol: " + canco.titol;
    const artist: HTMLDivElement = document.createElement("p");
    artist.textContent = "Artista: " + canco.artista;

    const xdiv: HTMLDivElement = document.createElement("div");
    xdiv.textContent = "X"
    card.appendChild(title);
    card.appendChild(artist);
    card.appendChild(xdiv);
    xdiv.addEventListener("click", () => {
        card.innerHTML = " ";
    })
    return card;
}