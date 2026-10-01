import type { Canco } from "../../interface/track";
import { reproductionPlus } from "./reproductionPlus";

export function crearBotoPlay(track: Canco, reproduccions: HTMLTableCellElement) {


    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Play";
    let playing: boolean = false;
    button.addEventListener("click", () => {
    
        if (playing === false) {
            track.reproduction = reproductionPlus(track.reproduction);
            reproduccions.textContent = track.reproduction.toString();
            button.textContent = "Playing"
            playing = true;
        } else {
            button.textContent = "Play"
            playing = false;
        }
    });
    return button
}