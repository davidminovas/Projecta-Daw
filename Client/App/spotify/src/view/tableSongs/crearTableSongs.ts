import { cancons } from "../../data/track";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";


export function crearTableSong(): HTMLTableElement {


    const table: HTMLTableElement = document.createElement("table");
    table.appendChild(createTableHead());


    const tbody: HTMLTableSectionElement = document.createElement("tbody");

    llistaCancons(cancons, tbody);

    table.appendChild(tbody);
    return table;
}