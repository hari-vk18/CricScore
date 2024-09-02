import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './App.css'
import GetMatches from './component/GetMatches'
import PlayerSearch from './component/PlayerSearch'
import News from './component/News'
import MatchType from './component/MatchType'
import PlayersRank from './component/Rankings/PlayersRank'
import Rankings from './component/Rankings/Rankings'
import Cricscore from './component/Cricscore'
import Nav from './component/Nav';
import { getMatchInfo, getMatchInfo1 } from './api/api';
import Schedule from './component/Schedule';

function App() {
  // const [count, setCount] = useState(0);
  // const [limit, setLimit] = useState([]);
  // useEffect(() => {
  //   getMatchInfo1()
  //     .then((data) => {
  //       const matchData = data.typeMatches;
  //       console.log('Fetched Match Data:', matchData);
  //       if (matchData.length > 0) {
  //         setLimit(matchData.slice(0, 5));
  //       }
  //       // setLoading(false)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/"
          element={<GetMatches />} />
        <Route path='/playersearch'
          element={<PlayerSearch />} />
        <Route path='/sportsnews'
          element={<News />} />
        <Route path='/schedule'
          element={<Schedule />} />
        <Route path='/rankings'
          element={<Rankings />} />
      </Routes>

      {/* <MatchType /> */}
      {/* <PlayersRank /> */}
    </Router>
  )
}

export default App
