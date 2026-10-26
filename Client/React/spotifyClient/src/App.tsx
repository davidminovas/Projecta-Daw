import './App.css'
import SongCard from './Components/Songs/SongCard';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import { users } from './Data/user/user';
import { useState } from 'react';


function App() {



  const [track, setTrack] = useState(() => tracks[Math.floor(Math.random() * tracks.length)]);
  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());;


  const data = now.toLocaleString('ca-ES');


  const trackwr: trackView = {
    ...track,
    "totalReproduction": Math.floor(Math.random() * 100000),
  }
  return (
    <>
      <header>
        <h1>Spotify</h1>
        <p>Usuari: {user.name}</p>
        <p>
          Data i hora: {data}
        </p>
        <button type="button" onClick={() => setNow(new Date())}>
          Actualitza la data
        </button>
        <button
          type="button"
          onClick={() => setTrack(tracks[Math.floor(Math.random() * tracks.length)])}
        >
          Canvia la cançó
        </button>
      </header>
      <SongCard trackInfo={trackwr} />
    </>
  )
}

export default App;
