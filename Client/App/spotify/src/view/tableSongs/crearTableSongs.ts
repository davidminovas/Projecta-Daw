import { cancons } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";


export function crearTableSong(
    tbody: HTMLTableSectionElement,
): HTMLTableElement {

    const table: HTMLTableElement = document.createElement("table");
    table.appendChild(createTableHead());

    llistaCancons(cancons, tbody);
    table.appendChild(tbody);
    return table;
}