import './App.css'
import SongCard from './Components/Songs/SongCard';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import { users } from './Data/user/user';
import type { Track } from './Model/Track';


function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];
  const randomUser: number = Math.floor(Math.random() * users.length);
  const user = users[randomUser];
  const now = new Date();


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
      </header>
      <SongCard trackInfo={trackwr} />
    </>
  )
}

export default App;
