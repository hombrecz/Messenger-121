import {LOG_USER, ADD_THREAD, CHANGE_THREAD, SEND_MESSAGE, USER_LOGGED, THREAD_CHANGED, ALL_THREADS} from '../actions/actions'
import io from 'socket.io-client';

const socket = io();

const initialThread = {name: 'general', messages: []};
const initialUser = 'user';
const initialAllThreads = [initialThread];

const initialState = {
    activeThread : initialThread,
    threads : initialAllThreads,
    user : initialUser
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case LOG_USER: {
            socket.emit('log user', action.username);
            return state;
        }
        case ADD_THREAD: {
            socket.emit('create thread', action.newThread);
            return state;
        }
        case CHANGE_THREAD: {
            socket.emit('change thread', action.activeThreadName, action.threadName);
            return state;
        }
        case SEND_MESSAGE: {
            socket.emit('new message',action. activeThreadName, action.message);
            return state;
        }
        case USER_LOGGED:
            return Object.assign({}, state, {user : action.user.username});
        case THREAD_CHANGED:
            return Object.assign({}, state, {activeThread : action.thread});
        case ALL_THREADS:
            return Object.assign({}, state, {threads : action.allThreads});
        default:
            return state;
    }
}

export default reducers