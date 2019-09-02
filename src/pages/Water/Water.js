import React from 'react';
// import WhatLength from "../../components/WhatLength/WhatLength"

class Water extends React.Component {

    waterChallenge = () => {
        alert("Water challenge created! Whoever runs the furthest wins. Good Luck!");
    }

    render() {
        return(
        <div>
            {/* <WhatLength/> */}
            <div className="row center">
                <div>
                    <h4>Are you sure you want to create a water challenge?</h4>
                </div>
                {/* <a class="waves-effect waves-light btn" onClick={this.waterChallenge}>Submit</a> */}
                <button class="waves-effect waves-light btn" onClick={this.waterChallenge}>Submit</button>
            </div>
        </div>
        )
    }
}

export default Water;
