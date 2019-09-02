import React, { Component } from 'react';
import MessageItem from "../MessageItem/MessageItem"
import "./MessageBoard.css"
import API from "../../utilities/API.js"
import M from "materialize-css";
//import Auth, { user } from '../../utilities/authorizer'


class MessageBoard extends Component {
    componentDidMount(){
        M.AutoInit()
    }

    constructor(props) {
        super(props)
        this.state = {
            showItemIndex: null,
            challenge_id: 1,
            messages: [],
            message_body: "",
        }

    }

    componentWillMount() {
        console.log("These are the message for CHallenge: ")
        API.getMessages(1)
            .then(res => {
                console.log("Message board" + JSON.stringify(res.data))
                this.setState({ messages: res.data })
                console.log("***********" + JSON.stringify(res.data))
            })
            .catch(err => console.log(err))
    }


    handleClick = (index) => {
        if (this.state.showItemIndex === index) {
            this.setState({ showItemIndex: null });
        } else {
            this.setState({ showItemIndex: index });
        }

    }

    handleMessageChange = (event) => {
        const { value } = event.target;
        this.setState({
            message_body: value
        })
    }

    messageSubmit = (event) => {
        event.preventDefault();
        let { message_body, user_id, challenge_id } = this.state;
        let newMessageObj = {

            message_body: message_body,
            user_id: user_id,
            group_challenge_id: challenge_id,
            //user_id: this.props.user_id

        }
        API.sendMessage(newMessageObj)
            .then(res => {
                console.log("This is what I sent" + JSON.stringify(res.data))
                this.setState({
                    message_body: "",
                })
            })
            .catch(err => console.log(err))
        API.getMessages(1)
            .then(res => {
                console.log("Message board" + JSON.stringify(res.data))
                this.setState({ messages: res.data })
                console.log("***********" + JSON.stringify(res.data))
            })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.props.user_id)
        let messages = this.state.messages.map(messages => (
            <MessageItem
                handleClick={this.handleClick}
                showMe={this.state.showItemIndex === messages.id}
                key={messages.id}
                index={messages.id}
                username={messages.username}
                message_body={messages.message_body}
                createdAt={messages.createdAt} />
        ))
        return (
            <div className="container">
                <ul className="col s12 collapsible popout">
                    {messages}
                </ul>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="icon_prefix2" name="message_body" value={this.state.message_body} onChange={this.handleMessageChange} className="materialize-textarea"></textarea>
                                <label htmlFor="icon_prefix2">message</label>
                            </div>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn-small" id="message_button" onClick={this.messageSubmit}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default MessageBoard;
