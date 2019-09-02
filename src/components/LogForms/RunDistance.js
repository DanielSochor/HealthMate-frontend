import React from 'react';
import API from "../../utilities/API.js";
//* import moment from "moment";

class RunDistanceLog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            group_challenge_id: 1,
            running_distance: "",
            logs: [],
            shown: true
        }
    }

    componentDidMount() {
        API.getRunningDistLogs(1)
            .then(res => {
                console.log("Pulling running logs" + JSON.stringify(res))
                this.setState({ logs: res.data })
            })
            .catch(err => console.log(err))
    }

    toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
    }

    messageSubmit = (event) => {
        event.preventDefault();
        this.setState({
            shown: !this.state.shown
        });
        //let { user_id, group_challenge_id, running_distance } = this.state;
        let { group_challenge_id, running_distance } = this.state;
        let newRunningLog = {
            user_id: this.props.user_id,
            group_challenge_id: group_challenge_id,
            running_distance: running_distance
        }
        API.addRunningDistLog(newRunningLog)
            .then(res => {
                console.log("Run distance info" + JSON.stringify(res.data))
                this.setState({
                    running_distance: ""
                })
            })
            .catch(err => console.log(err)
            )
    }

    render() {
        let shown = {
			display: this.state.shown ? "block" : "none"
		};
		let hidden = {
			display: this.state.shown ? "none" : "block"
		}
        return (
            <div className="container">
                <div className="row" style={shown}>
                    <form className="col s12">
                        <div >
                            <h5>How many miles did you run today?</h5>
                            <input
                                name="running_distance"
                                value={this.state.running_distance}
                                onChange={this.handleInputChange}
                                type="text"
                            />
                        </div>
                        <div>
                            <button className="submitRunLog waves-effect waves-light btn" onClick={this.messageSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="row" style={hidden}>
                    <form className="col s12">
                        <div>
                            <h5>Great job!</h5>
                            <div>
                                <button className="waves-effect waves-light btn" onClick={this.toggle.bind(this)}>Add new log</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <table className="striped centered">
                        {/* <thead>
                            <tr>
                                <th>Date Logged</th>
                                <th>Logged</th>
                            </tr>
                        </thead>
                        <tbody> */}
                            {/* {this.state.logs.map(log =>
                                <tr key={log.id}>
                                    <td>{moment(log.createdAt).format('MM/DD/YY')}</td>
                                    <td>{log.running_distance}</td>
                                </tr>
                            )} */}
                        {/* </tbody> */}
                    </table>
                </div>
            </div>
        )
    }
}

export default RunDistanceLog;