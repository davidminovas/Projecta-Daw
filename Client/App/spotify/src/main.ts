import { cancons } from './data/track';
import type { Canco } from './interface/track';
import './style.css'
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/createTitol';
import { crearTableSong } from './view/tableSongs/crearTableSongs';
import { llistaCancons } from './view/tableSongs/llistaCancons';
import { viewCancoTriada } from './view/tableSongs/viewCancoTriada';


const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const cardTrack: HTMLDivElement = document.createElement("div");

const getIdCanco: (id: string) => void = (id: string)=>
{
    cardTrack.replaceChildren(viewCancoTriada(id));
}

const cercar: (textABuscar: string) => void = (textABuscar: string) => {
    const llistaTracks: Canco[] = cancons.filter(
        (t: Canco) => { return t.titol.toLowerCase().includes(textABuscar.trim().toLowerCase()) }
    );
    tbody.innerHTML = ""; llistaCancons(llistaTracks, tbody, getIdCanco);
}

appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(crearTableSong(tbody, getIdCanco));
appObj.appendChild(cardTrack);



