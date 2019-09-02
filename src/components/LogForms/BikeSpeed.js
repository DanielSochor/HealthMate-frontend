import React from 'react';
import API from "../../utilities/API.js"
import moment from "moment"

class BikeSpeedLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 1,
            group_challenge_id: 4,
            biking_pace: "",
            logs: [],
            shown: true
        }
    }

    componentDidMount() {
        API.getBikingPaceLogs(4)
            .then(res => {
                console.log("Bike Speed Info pulled" + JSON.stringify(res.data))
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
        //* let { user_id, group_challenge_id, biking_pace } = this.state;
        let { group_challenge_id, biking_pace } = this.state;
        let newBikingLog = {
            user_id: this.props.user_id,
            group_challenge_id: group_challenge_id,
            biking_pace: biking_pace
        }
        API.addBikingPaceLog(newBikingLog)
            .then(res => {
                console.log("YO Bike Speed" + JSON.stringify(res.data))
                this.setState({
                    biking_pace: ""
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
                            <h5>What pace did you bike today?</h5>
                            <input
                                name="biking_pace"
                                value={this.state.bikeing_pace}
                                onChange={this.handleInputChange}
                                type="text"
                                placeholder="HH:MM:SS"
                            />
                        </div>
                        <div>
                            <button className="waves-effect waves-light btn" onClick={this.messageSubmit}>Submit</button>
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
                                    <td>{log.biking_pace}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default BikeSpeedLog;