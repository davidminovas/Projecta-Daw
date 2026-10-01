export function createTableHead(): HTMLTableSectionElement {

    const thead: HTMLTableSectionElement = document.createElement("thead");
    const trHead: HTMLTableRowElement = document.createElement("tr");
    const thTitol: HTMLTableCellElement = document.createElement("th");
    const thDurada: HTMLTableCellElement = document.createElement("th");
    const thReproduccio: HTMLTableCellElement = document.createElement("th");
    const thPlay: HTMLTableCellElement = document.createElement("th");



    thTitol.textContent = "Títol";
    thDurada.textContent = "Durada";
    thReproduccio.textContent = "Reproducions";
    thPlay.textContent = "Reproduint"

    trHead.appendChild(thTitol);
    trHead.appendChild(thDurada);
    trHead.appendChild(thPlay);
    trHead.appendChild(thReproduccio);
    thead.appendChild(trHead);
    return thead
}



