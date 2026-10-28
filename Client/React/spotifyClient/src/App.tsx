import './App.css'
import ReproductionCard from './Components/Songs/reproductionCard';
import type { reproductionView } from './Components/Songs/reproductionCard/reproductionView';
import SongCard from './Components/Songs/SongCard';
import type { Like } from './Components/Songs/Types/like';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import { users } from './Data/user/user';
import { useState } from 'react';


function App() {



  const [track, setTrack] = useState<trackView>(
    {
      ...tracks[(Math.floor(Math.random() * tracks.length))],
      totalReproduction: Math.floor(Math.random() * 1000),
      likes: {
        like: true,
        totalLikes: 100

      }
    }
  );
  const [reproduction, setReproduction] = useState<reproductionView>(
    {
      volum: 0,
    }
  );



  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());
  const [hasPlayed, setHasPlayed] = useState(false);



  function incrementReproduction() {
    const tr = (prev: trackView): trackView => {
      return {
        ...prev,
        totalReproduction: prev.totalReproduction + 1,
      }
    }
    setTrack(tr);
  }



  function incrementVolumSong() {
    const tr = (prev: reproductionView): reproductionView => {
      if (prev.volum != 100) {
        return {
          volum: prev.volum + 1,

        }
      } else {
        return {
          volum: 100,
        }
      }
    }
    setReproduction(tr);
  }

  function disminucioVolumSong() {
    const tr = (prev: reproductionView): reproductionView => {
      if (prev.volum != 0) {
        return {
          volum: prev.volum - 1
        }
      } else {
        return {
          volum: 0
        }
      }
    }
    setReproduction(tr);

  }




  const data = now.toLocaleString('ca-ES');



  function handleCklickRandom() {
    const trackRandom: trackView = {

      ...tracks[(Math.floor(Math.random() * tracks.length))],
      totalReproduction: Math.floor(Math.random() * 100000),
      likes: {
        like: true,
        totalLikes: 100

      }

    }
    setTrack(trackRandom);
  };

  function handelClickReset() {
    const tr = (prev: trackView): trackView => {
      return {
        ...prev,
        totalReproduction: 0,
        likes: {
          like: false,
          totalLikes: 0
        }
      }
    };
    setTrack(tr);
  }

  function gestionarLikes() {
    const tr = (prev: trackView): trackView => {


      let increment: number = 1;
      if (prev.likes.like) {
        increment = -1;

      }
      const likeObj: Like = {
        like: !prev.likes.like,
        totalLikes: prev.likes.totalLikes + increment
      };


      return {
        ...prev,
        likes: likeObj
      }
    }
    setTrack(tr);

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
          onClick={handleCklickRandom}
        >
          Canvia la cançó
        </button>
      </header>
      <SongCard trackInfo={track} play={() => {
        incrementReproduction();
        setHasPlayed(true);
      }} like={() => gestionarLikes()} reset={() => handelClickReset()} />
      <ReproductionCard reproductionInfo={reproduction} augment={() => incrementVolumSong()} disminuir={() => disminucioVolumSong()} hasPlayed={hasPlayed} />
    </>
  )
}

export default App;
