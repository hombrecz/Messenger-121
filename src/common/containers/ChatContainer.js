import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actions';
import Chat from '../components/Chat';
import io from 'socket.io-client';

const settings = require('../../../settings.js');

const socket = io();

class ChatContainer extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const {user, activeThread, threads, dispatch} = this.props;
        socket.emit('log user', String(user));

        socket.on('connected', function () {
            console.log('connected - getting data');
            socket.emit('log user', user);
            socket.emit('change thread', '', activeThread.name);
            socket.emit('get threads');
        });

        socket.on('user logged', user => {
                console.log('user logged: ' + user.name);
                dispatch(Actions.userLogged(user.name));
            }
        );

        socket.on('thread changed', activeThread => {
                console.log('thread changed: ' + activeThread.name);
                dispatch(Actions.threadChanged(activeThread));
            }
        );

        socket.on('all threads', allThreads => {
                console.log('all threads: ' + allThreads.length);
                dispatch(Actions.allThreads(allThreads));
            }
        );

    }

    render() {
        return <Chat user={this.props.user}
                     activeThread={this.props.activeThread}
                     threads={this.props.threads}
                     actions={this.props.actions}
        />;
    }
}

ChatContainer.propTypes = {
    user: PropTypes.string.isRequired,
    activeThread: PropTypes.object.isRequired,
    threads: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        activeThread: state.activeThread,
        threads: state.threads
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatContainer);