import type { Canco } from "../../interface/track"
import { createRowSong } from "../rowView"

export function llistaCancons(tracks:Canco[], tbody:HTMLTableSectionElement):void {
    tracks.forEach(
        (t: Canco) => { tbody.appendChild(createRowSong(t)) }
    )
}