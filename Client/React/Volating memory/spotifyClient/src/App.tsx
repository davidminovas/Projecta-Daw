import './App.css'
import ReproductionCard from './Components/Songs/reproductionCard';
import type { reproductionView } from './Components/Songs/reproductionCard/reproductionView';
import SongCard from './Components/Songs/SongCard';
import type { Like } from './Components/Songs/Types/like';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import { users } from './Data/user/user';
import { useState } from 'react';
import ListSongs from './Components/Songs/listSong';
import ListCard from './Components/llist/listCard';
import type { listView } from "./Components/llist/listView";

function App() {


  function timeCorrection(duration: number) {
    const second = duration % 60;
    const minut = Math.floor(duration / 60);
    return `${minut}:${String(second).padStart(2, '0')}`;
  }


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
      title: track.tittle,
    }
  );



  const [user] = useState(() => users[Math.floor(Math.random() * users.length)]);
  const [now, setNow] = useState(() => new Date());
  let [hasPlayed, setHasPlayed] = useState(false);
  const [history, setHistory] = useState<listView[]>([]);
  const [playButtonHidden, setPlayButtonHidden] = useState(false);


  function incrementReproduction() {
    const tr = (prev: trackView): trackView => {
      return {
        ...prev,
        totalReproduction: prev.totalReproduction + 1,
      }
    }
    setTrack(tr);
  }

  function stopSong() {
    setHasPlayed(false);
    setPlayButtonHidden(false);
  }

  function incrementVolumSong() {
    const tr = (prev: reproductionView): reproductionView => {
      if (prev.volum != 100) {
        return {
          volum: prev.volum + 1,
          title: prev.title,

        }
      } else {
        return {
          volum: 100,
          title: prev.title

        }
      }
    }
    setReproduction(tr);
  }

  function disminucioVolumSong() {
    const tr = (prev: reproductionView): reproductionView => {
      if (prev.volum != 0) {
        return {
          volum: prev.volum - 1,
          title: prev.title,
        }
      } else {
        return {
          volum: 0,
          title: prev.title
        }
      }
    }
    setReproduction(tr);

  }




  const data = now.toLocaleString('ca-ES');



  function handleCklickRandom() {
    setHasPlayed(false);
    setPlayButtonHidden(false);
    const trackRandom: trackView = {

      ...tracks[(Math.floor(Math.random() * tracks.length))],
      totalReproduction: Math.floor(Math.random() * 100000),
      likes: {
        like: true,
        totalLikes: 100

      }

    }
    const tr = (prev: reproductionView): reproductionView => {
      return {
        volum: prev.volum,
        title: prev.title
      }
    }
    setTrack(trackRandom);
    setReproduction(tr);
  };

  function handelClickReset() {
    const tr = (prev: trackView): trackView => {
      setHasPlayed(false);
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
      <main>
        <table>
          <thead>
            <title></title>
          </thead>
          <tbody>
            <ListSongs tracks={tracks} time={timeCorrection} />
          </tbody>
        </table>
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
        <SongCard
          trackInfo={track}
          playButtonHidden={playButtonHidden}
          play={() => {
            incrementReproduction();
            setReproduction(prev => ({
              ...prev,
              title: track.tittle,
            }));
            setHistory(prev => [
              ...prev,
              { title: track.tittle, data: new Date() },
            ]);
            setHasPlayed(true);
            setPlayButtonHidden(true);
          }}
          like={() => gestionarLikes()}
          reset={() => handelClickReset()}
          time={() => timeCorrection(track.duration)}
        />
        <hr />
        <ReproductionCard reproductionInfo={reproduction} augment={() => incrementVolumSong()} disminuir={() => disminucioVolumSong()} hasPlayed={hasPlayed} stop={() => stopSong()} />
        <ListCard history={history} />
      </main>
    </>
  )
}

export default App;
