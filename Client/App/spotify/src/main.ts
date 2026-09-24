import './style.css'
import { crearCerca } from './view/cerca/cerca';
import { crearTitol } from './view/createTitol';
import { crearTableSong } from './view/tableSongs/crearTableSongs';


const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

appObj.appendChild(crearTitol());
appObj.appendChild(crearTableSong());
appObj.appendChild(crearCerca());
