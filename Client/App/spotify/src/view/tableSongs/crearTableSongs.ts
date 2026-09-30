import { cancons } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";


export function crearTableSong(
    tbody: HTMLTableSectionElement,
    getIdCanco: (id: string) => void

): HTMLTableElement {

    const table: HTMLTableElement = document.createElement("table");

    table.appendChild(createTableHead());

    llistaCancons(cancons, tbody, getIdCanco);
    table.appendChild(tbody);
    return table;
}