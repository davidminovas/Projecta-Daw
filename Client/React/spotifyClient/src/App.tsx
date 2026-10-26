import './App.css'
import SongCard from './Components/Songs/SongCard';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import { users } from './Data/user/user';
import { useState } from 'react';


function App() {



  const [track, setTrack] = useState<trackView>(
    {
      ...tracks[(Math.floor(Math.random() * tracks.length))],
      totalReproduction: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100)
    }
  );



  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());



  function incrementReproduction() {
    const tr = (prev: trackView): trackView => {
      return {
        ...prev,
        totalReproduction: prev.totalReproduction + 1,
      }
    }
    setTrack(tr);

  }

  const data = now.toLocaleString('ca-ES');


  const trackwr: trackView = {
    ...track,
    "totalReproduction": Math.floor(Math.random() * 100000),
    likes: 23,
  }

  function handleCklickRandom() {
    const tr = (prev: trackView): trackView => {
      return {
        ...tracks[(Math.floor(Math.random() * tracks.length))],
        totalReproduction: Math.floor(Math.random() * 100000),
        likes: Math.floor(Math.random() * 100000),
      }
    }
    setTrack(tr);
  };
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
          onClick={handleCklickRandom}
        >
          Canvia la cançó
        </button>
      </header>
      <SongCard trackInfo={trackwr} play={()=>incrementReproduction()} />
    </>
  )
}

export default App;
