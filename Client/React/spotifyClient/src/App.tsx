import './App.css'
import SongCerd from './Components/Songs/SongCard'
import { tracks } from './Data/track/tracks';
import type { Track } from './Model/Track';


function App() {


  const totalTracks: number = tracks.length;
  const random: number = Math.floor(Math.random() * totalTracks);
  const track: Track = tracks[random];
  return (
    <>
      <SongCerd trackInfo={track} />
    </>
  )
}

export default App;
