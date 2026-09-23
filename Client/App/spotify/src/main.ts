import './style.css'
import { cancons } from './data/track'
import { createRowSong } from './view/rowView';


const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const titol: HTMLHeadElement = document.createElement("h1");
const table: HTMLTableElement = document.createElement("table");
const rowSong: HTMLTableRowElement = createRowSong(cancons[0]);
titol.textContent = "Spotify";

appObj.appendChild(titol);
table.appendChild(rowSong);

appObj.appendChild(table);
