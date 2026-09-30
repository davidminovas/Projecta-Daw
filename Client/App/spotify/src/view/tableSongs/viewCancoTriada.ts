import { cancons } from "../../data/track";
import { cancoTriada } from "./trackchose";


export function viewCancoTriada(cancoId: string): HTMLDivElement {
    const carta: HTMLDivElement = document.createElement("div");
    cancoTriada(cancons, cancoId, carta);
    return carta;
}