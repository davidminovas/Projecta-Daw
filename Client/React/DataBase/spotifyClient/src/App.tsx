import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import Play from './Pages/Authenticated/Play';
import Header from './Components/PageEstrocture/Header/header';
import { useState } from 'react';
import { users } from './Data/user/user';
import Menu from './Components/PageEstrocture/menu/Menu';
import type { User } from './Model/User';
import Song from './Pages/admin/Song';
import Artist from './Pages/admin/Artist';




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
        <Route path="/Song" element={<Song />} />
        <Route path="/Artist">{ <Artist/>}</Route>
        <Route path="/Album" />
      </Routes>
    </BrowserRouter>
  )

}

export default App;


