import React, {Component, PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

export default class ThreadPanel extends Component {

    static propTypes = {
        addThread: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            newThread: ''
        };
    }

    handleFormChange(event) {
        this.setState({newThread: event.target.value});
    }

    handleCreateThread() {
        this.props.addThread(this.state.newThread);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Input
                    ref="threadName"
                    type="text"
                    name="threadName"
                    placeholder="Enter the thread name"
                    value={this.state.newThread}
                    onChange={this.handleFormChange.bind(this)}
                />
                <Button
                    bsStyle="primary"
                    onClick={ this.handleCreateThread.bind(this)}>
                    Add thread
                </Button>
            </div>
        );
    }
}
