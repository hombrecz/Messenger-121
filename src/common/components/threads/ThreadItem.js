import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

export default class ThreadItem extends Component {

    static propTypes = {
        activeThread: PropTypes.object.isRequired,
        threadName: PropTypes.string.isRequired,
        changeThread: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    handleChangeThread() {
        this.props.changeThread(this.props.activeThread.name, this.props.threadName);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Button
                    bsStyle="link"
                    bsSize="xsmall"
                    block
                    onClick={ this.handleChangeThread.bind(this)}>
                    <h5>{this.props.threadName}</h5>
                </Button>
            </div>
        );
    }
}