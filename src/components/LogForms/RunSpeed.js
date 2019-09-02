import React from 'react';
import API from "../../utilities/API.js"
import moment from "moment"

class RunSpeedLog extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
            group_challenge_id: 3,
            running_pace: "",
            logs: [],
            shown: true
        }
    }

    componentDidMount() {
        API.getRunningPaceLogs(3)
            .then(res => {
                console.log("Run Speed Info" + JSON.stringify(res.data))
                this.setState({logs:res.data})
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
        let { user_id, group_challenge_id, running_pace } = this.state;
        let newRunningLog = {
            user_id: user_id,
            group_challenge_id: group_challenge_id,
            running_pace: running_pace
        }
        API.addRunningPaceLog(newRunningLog)
            .then(res => {
                console.log("Yo Run SPeed" + JSON.stringify(res.data))
                this.setState({
                    running_pace: ""
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
                        <div>
                            <h5>What pace did you run today?</h5>
                            <input
                                name="running_pace"
                                value={this.state.running_pace}
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="HH:MM:SS"
                            />
                        </div>
                        <div>
                            <button class="waves-effect waves-light btn" onClick={this.messageSubmit}>Submit</button>
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
                    <table class="striped centered">
                        <thead>
                            <tr>
                                <th>Date Logged</th>
                                <th>Pace</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.logs.map(log =>
                                <tr key={log.id}>
                                    <td>{moment(log.createdAt).format('MM/DD/YY')}</td>
                                    <td>{log.running_pace}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RunSpeedLog;