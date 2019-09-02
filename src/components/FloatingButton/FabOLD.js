import React, { Component } from 'react';
import "./Fab.css"
import M from "materialize-css";
// import PickChallenge from "../../pages/ChallengePickPage/ChallengePickPage"


class FloatingActionButton extends Component {
    componentDidMount() {
        M.AutoInit()
    }

    // constructor(props) {
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.state = { challenge: '' };
    // }
    // handleChange = (event) => {
    //     const challenge = event.target.value;
    //     this.props.onSelect(challenge)
    // }

    render() {
        return (
            <div className="fixed-action-btn">
                <button className="btn-floating btn-large red">
                    <i className="fab large material-icons" tabIndex="1">add</i>
                </button>
                <ul>
                    <li><a className="btn-floating green" value="run" href="/pickrunchallenge"><i className="material-icons">directions_run</i></a></li>
                    <li><a className="btn-floating yellow darken-1" value="bike" href="/pickbikechallenge"><i className="material-icons">directions_bike</i></a></li>
                    <li><a className="btn-floating blue" value="water" href="/pickwaterchallenge"><i className="material-icons">local_drink</i></a></li>
                    <li><a className="btn-floating red" value="abstain" href="/pickabstainchallenge"><i className="material-icons">smoke_free</i></a></li>
                </ul>
            </div>
        );
    }

}


export default FloatingActionButton;