import './App.css'
import SongCard from './Components/Songs/SongCard';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import type { Track } from './Model/Track';


function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];


  const totalReproduction: trackView = {
    ...track,
    "totalReproduction": Math.floor(Math.random() * 100000),
  }
  return (
    <>
      <header />
      <SongCard trackInfo={totalReproduction} />
    </>
  )
}

export default App;
