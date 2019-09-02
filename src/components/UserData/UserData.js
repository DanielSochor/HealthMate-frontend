import React, { Component } from 'react';
import "./UserData.css"
import RunDistanceLog from "../LogForms/RunDistance"
import BikeDistanceLog from "../LogForms/BikeDistance"
//* import moment from "moment"
//* import API from "../../utilities/API.js"
import RunSpeedLog from '../LogForms/RunSpeed';
import BikeSpeedLog from "../LogForms/BikeSpeed";
import ChallengePage from "../ChallengePage/ChallengePage"

class UserData extends Component {
    state = {
        challengeType: "RunDist"
    }

    // user_id={this.props.user_id}
    renderPage = () => {
        if (this.state.challengeType === "RunDist") {
            return <RunDistanceLog user_id={this.props.user_id}/>;
        } else if (this.state.challengeType === "RunSpeed") {
            return <RunSpeedLog user_id={this.props.user_id} />;
        } else if (this.state.challengeType === "BikeDist") {
            return <BikeDistanceLog user_id={this.props.user_id}/>;
        } else if (this.state.challengeType === "BikeSpeed") {
            return <BikeSpeedLog user_id={this.props.user_id}/>;
        } else {
            return <ChallengePage />;
        }
    };


    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         logs: [],
    //         group_challenge_id: 1,
    //     }
    // }

    // componentDidMount() {
    //     // API.getUserRunningDistLogs(1)
    //     //     .then(res => {
    //     //         console.log("This is the response" + JSON.stringify(res))
    //     //         this.setState({logs:res.data})
    //     //         console.log("***********" + JSON.stringify(res))
    //     //     })
    //     //     .catch(err => console.log(err))
    // }


    render() {
        console.log(this.props.user_id+"NICKNICKNICK")
        return (
            <div>
                <div>
                    <h3>Log Page</h3>
                </div>
                <div>
                    {this.renderPage()}
                </div>
            </div>
        );
    }
}


//     render() {
//         return (<div>
//             <div>
//                 <h3>User Data</h3>
//             </div>
//             <RunSpeedLog />
//             <RunDistanceLog />
//             <BikeDistanceLog />
//             <table class="striped centered">
//                 <thead>
//                     <tr>
//                         <th>Date Logged</th>
//                         <th>Logged</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {this.state.logs.map(log =>
//                     <tr key={log.id}>
//                         <td>{moment(log.createdAt).format('MM/DD/YY')}</td>
//                         <td>{log.user_log}</td>
//                     </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//         )
//     }

// }

export default UserData;