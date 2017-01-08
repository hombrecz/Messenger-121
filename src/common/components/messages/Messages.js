import React, {Component, PropTypes} from 'react';
import MessagePanel from './MessagePanel';
import MessageItem from './MessageItem';
import {Panel} from 'react-bootstrap';

export default class Messages extends Component {

    static propTypes = {
        activeThread: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        user: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let messages = this.props.activeThread.messages;
        let threadName = this.props.activeThread.name;
        return (
            <Panel
                header={threadName + " - messages"}
                bsStyle="primary"
            >
                <ul>
                    {messages.map((message, i) =>
                        <MessageItem message={message} key={i}/>
                    )}
                </ul>
                <MessagePanel activeThread={this.props.activeThread} user={this.props.user} sendMessage={this.props.sendMessage}/>
            </Panel>
        );
    }
}
