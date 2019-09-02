import React from 'react';
import API from "../../utilities/API.js"
import moment from "moment"

class BikeDistanceLog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: 1,
            group_challenge_id: 2,
            biking_distance: "",
            logs: [],
            shown: true
        }
    }

    componentDidMount() {
        API.getBikingDistLogs(2)
            .then(res => {
                console.log("Biking logs" + JSON.stringify(res.data))
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
        alert("Biking distance logged")
    }

    messageSubmit = (event) => {
        event.preventDefault();
        this.setState({
            shown: !this.state.shown
        });
        //* let { user_id, group_challenge_id, biking_distance } = this.state;
        let { group_challenge_id, biking_distance } = this.state;
        let newBikingLog = {
            user_id: this.props.user_id,
            group_challenge_id: group_challenge_id,
            biking_distance: biking_distance
        }
        API.addBikingDistLog(newBikingLog)
            .then(res => {
                console.log("RIGHT HERE" + JSON.stringify(res.data))
                this.setState({
                    biking_distance: ""
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
                            <h5>How many miles did you bike today?</h5>
                            <input
                                name="biking_distance"
                                value={this.state.biking_distance}
                                onChange={this.handleInputChange}
                                type="text"
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
                                <th>Miles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.logs.map(log =>
                                <tr key={log.id}>
                                    <td>{moment(log.createdAt).format('MM/DD/YY')}</td>
                                    <td>{log.biking_distance}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default BikeDistanceLog;