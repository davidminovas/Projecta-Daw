import './style.css'
import { Canco } from './interface/track'
import { cancons } from './data/track'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1> Spotify</h1>
<p>${cancons[0].titol}</p>
`
