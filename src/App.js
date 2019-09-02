//import { BrowserRouter as Router, Route } from "react-router-dom";
//* import Run from "./pages/Run/Run";
import './App.css';
//* import Bike from './pages/Bike/Bike';
//* import Abstain from './pages/Abstaining/Abstaining';
//* import Water from './pages/Water/Water';

//* import React, { useEffect }  from 'react';
import React from 'react';

// @TODO is pubsub necessary to show the login modal?
//* import Pubsub from './utilities/pubsub';

import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';

//* import ChallengePage from './components/ChallengePage/ChallengePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
