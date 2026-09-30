import type { Canco } from "../../interface/track";
import { createTrackChose } from "../viewTrackChose";



export function cancoTriada(cancons: Canco[], cancoId: string, tbody: HTMLDivElement): void {
    const canco = cancons.find((c: Canco) => c.id === cancoId);

    if (canco) {
        tbody.appendChild(createTrackChose(canco));
    }
}