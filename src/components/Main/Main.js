import React, { useState, useEffect } from 'react';
//import './main.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Run from "../../pages/Run/Run";
import Pubsub from '../../utilities/pubsub';
import LoginSignUpModal from '../LoginSignUpModal/LoginSignUpModal';
import Challenge from '../Challenge/Challenge';
import Auth from '../../utilities/authorizer';
import HomePage from "../../pages/HomePage/HomePage";
import Bike from '../../pages/Bike/Bike';
import Abstain from '../../pages/Abstaining/Abstaining';
import Water from '../../pages/Water/Water';
import ChallengePage from '../ChallengePage/ChallengePage';
import ChallengeContainer from '../ChallengeContainer/ChallengeContainer';
import FAB from '../FloatingButton/Fab';

function Main() {

  const [authenticated, setAuthenticated] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState('');

  useEffect(() => {
    Pubsub.subscribe('login', this, handleSignin);
    Pubsub.subscribe('logout', this, handleSignout);
    Pubsub.subscribe('challengeType', this, handleChallengeType);
    return (() => {
      Pubsub.unsubscribe('login', this);
      Pubsub.unsubscribe('logout', this);
      Pubsub.unsubscribe('challengeType', this);
    });
  }, []);

  const handleSignout = () => {
    setAuthenticated(false);
    //setSelectedGroupId('');
  }

  const handleSignin = () => {
    setAuthenticated(true);
    console.log('authenticated');
  }

  const handleChallengeType = (challenge) => {
    console.log(challenge);
  }

  return (
    <Router>
      <>
        {/* <Route exact path="/homepage" component={HomePage} /> */}
        {/* <Route exact path="/challengepage" component={ChallengePage} /> */}
        {/* <Route exact path="/pickrunchallenge" component={Run} />
        <Route exact path="/pickbikechallenge" component={Bike} />
        <Route exact path="/pickabstainchallenge" component={Abstain} />
        <Route exact path="/pickwaterchallenge" component={Water} /> */}
        <div className='container-fluid'>
          <LoginSignUpModal />
          <FAB />
          <ChallengeContainer />
          {/* <div className='row'>
            <Challenge selectedChallengeId={selectedChallengeId} />
          </div> */}
        </div>
      </>
    </Router>
  );
}

export default Main;