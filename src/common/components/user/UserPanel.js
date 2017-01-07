import React, {Component, PropTypes} from 'react';
import {Panel, Input, Button} from 'react-bootstrap';

export default class UserPanel extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        logUser: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.user
        };
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleLogin(event) {
        if (this.state.username.length) {
            this.props.logUser(this.state.username);
        }
        event.preventDefault();
    }

    render() {
        return (
            <Panel
                header ="User"
                collapsible
                defaultExpanded
            >
                    <Input
                        ref="userName"
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.handleChange.bind(this)}
                    />
                    <Button
                        bsStyle="primary"
                        onClick={ this.handleLogin.bind(this)}>
                        Sign Up
                    </Button>
            </Panel>
        );
    }
}
