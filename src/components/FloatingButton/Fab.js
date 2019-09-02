import React, { useState, useEffect } from '../../../node_modules/react';
import Pubsub from '../../utilities/pubsub';
import "./Fab.css"
//* import M from "materialize-css";
//* import Auth, { user } from '../../utilities/authorizer';

function FloatingActionButton() {

    const [authenticated, setAuthenticated] = useState(false);
    const [challengeType, setChallengeType] = useState('');

    useEffect(() => {
        Pubsub.subscribe('login', this, handleSignin);
        Pubsub.subscribe('logout', this, handleSignout);
        //Pubsub.subscribe('authenticated', this, handleSignInSignOut);
        return (() => {
          Pubsub.unsubscribe('login', this);
          Pubsub.unsubscribe('logout', this);
          //Pubsub.unsubscribe('authenticated', this);
        });
    }, []);

    //* const handleSignInSignOut = () => {
        
    //* }

    const handleSignout = () => {
        setAuthenticated(false);
    }

    const handleSignin = () => {
        setAuthenticated(true);
    }

    const handleChallengeType = (challengeType) => {
        setChallengeType(challengeType);
        Pubsub.publish('challengeType', challengeType);
    }

    const renderFAB = () => {
        // if(!authenticated) {
        //     return null
        // } else
        if(authenticated){ 
        if (challengeType === ('') ){

            return (
            <div className="fixed-action-btn">
                <div className="btn-floating btn-large">
                    <i className="fab large material-icons" tabIndex="1">add</i>
                </div>
                <ul>
                    <li><button className="run btn-floating" value="run" onClick={() => handleChallengeType('run')}><i className="material-icons">directions_run</i></button></li>
                    <li><button className="bike btn-floating" value="bike" onClick={() => handleChallengeType('bike')}><i className="material-icons">directions_bike</i></button></li>
                    <li><button className="water btn-floating" value="water" onClick={() => handleChallengeType('water')}><i className="material-icons">local_drink</i></button></li>
                    <li><button className="abstain btn-floating" value="abstain" onClick={() => handleChallengeType('abstain')}><i className="material-icons">smoke_free</i></button></li>
                </ul>
            </div>
            )
        }
    }
    }

    return (
        <div>
            {renderFAB()}
        </div>
    );
}

export default FloatingActionButton;
