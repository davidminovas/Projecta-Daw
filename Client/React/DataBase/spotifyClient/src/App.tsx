import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Play from './Pages/Authenticated/Play';
import Header from './Components/PageEstrocture/Header/header';
import { useState } from 'react';
import { users } from './Data/user/user';
import Menu from './Components/PageEstrocture/menu/Menu';
import type { reproductionView } from './Components/Songs/reproductionCard/reproductionView';
import type { trackView } from './Components/Songs/Types/trackView';
import { tracks } from './Data/track/tracks';
import type { User } from './Model/User';


function App() {
  const user: User = users[Math.floor(Math.random() * users.length)];
  const [now, setNow] = useState(() => new Date());
  const data = now.toLocaleString('ca-ES');

 
  return (

    <BrowserRouter>
      <Header
        userName={user.name}
        date={data}
        onRefreshDate={() => setNow(new Date())}
       
      />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;


