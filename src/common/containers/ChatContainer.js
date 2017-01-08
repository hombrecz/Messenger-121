import React, {Component} from 'react';
import Chat from '../components/Chat';
import io from 'socket.io-client';

const socket = io();
const initialThread = {name: 'general', messages: []};
const initialUser = 'user';

const actions = {
    logUser: function (username) {
        socket.emit('log user', username);
    },
    addThread: function (newThread) {
        socket.emit('create thread', newThread);
    },
    changeThread: function (activeThreadName, threadName) {
        socket.emit('change thread', activeThreadName, threadName);
    },
    sendMessage: function (activeThreadName, message) {
        console.log('new message ' + activeThreadName
            + ':' + message.from
            + ' - ' + message.time
            + ' - ' + message.content);
        socket.emit('new message', activeThreadName, message);
    }
};

export default class ChatContainer extends Component {
    constructor() {
        super();
        this.state = {
            user: initialUser, //this is only user's name
            activeThread: initialThread,
            threads: []
        }
    }

    componentDidMount() {
        const {user, activeThread, threads} = this.state;
        socket.emit('log user', String(user));

        socket.on('connected', function () {
            console.log('connected - getting data');
            socket.emit('log user', user);
            socket.emit('change thread', '', activeThread.name);
            socket.emit('get threads');
        });

        socket.on('user logged', user => {
                console.log('user logged: ' + user.name);
                this.setState({user: user.name})
            }
        );

        socket.on('thread changed', activeThread => {
                console.log('thread changed: ' + activeThread.name);
                this.setState({activeThread: activeThread})
            }
        );

        socket.on('all threads', allThreads => {
                console.log('all threads: ' + allThreads.length);
                this.setState({threads: allThreads});
            }
        );

    }

    render() {
        return <Chat user={this.state.user}
                     activeThread={this.state.activeThread}
                     threads={this.state.threads}
                     actions={actions}
        />;
    }
}