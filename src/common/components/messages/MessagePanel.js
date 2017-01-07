import React, {Component, PropTypes} from 'react';
import {Input, Button, Panel} from 'react-bootstrap';
import mongoose from 'mongoose';

export default class MessagePanel extends Component {

    static propTypes = {
        activeThread: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: ''
        };

    }

    handleFormChange(event) {
        this.setState({text: event.target.value});
    }

    handleSendMessage() {
        if (this.state.text != "") {
            let message = {from: this.props.user, time: new Date(), content: this.state.text, _id: mongoose.Types.ObjectId()};
            this.props.sendMessage(this.props.activeThread.name, message);
        }
        this.setState({text: ''});
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Input
                    ref="messagePanel"
                    type="textarea"
                    name="messagePanel"
                    placeholder="Type here to chat!"
                    value={this.state.text}
                    onChange={this.handleFormChange.bind(this)}
                />
                <Button
                    bsStyle="primary"
                    onClick={ this.handleSendMessage.bind(this)}
                >
                    Send
                </Button>
            </div>
        );
    }
}
