export const LOG_USER = 'LOG_USER';
export const ADD_THREAD = 'ADD_THREAD';
export const CHANGE_THREAD = 'CHANGE_THREAD';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const USER_LOGGED = 'USER_LOGGED';
export const THREAD_CHANGED = 'THREAD_CHANGED';
export const ALL_THREADS = 'ALL_THREADS';

export function logUser(username) {
    return {
        type: LOG_USER,
        username
    };
}

export function addThread(newThread) {
    return {
        type: ADD_THREAD,
        newThread
    };
}

export function changeThread(activeThreadName, threadName) {
    return {
        type: CHANGE_THREAD,
        activeThreadName,
        threadName
    };
}

export function sendMessage(activeThreadName, message) {
    return {
        type: SEND_MESSAGE,
        activeThreadName,
        message
    };
}

export function userLogged(user) {
    return {
        type: USER_LOGGED,
        user
    };
}

export function threadChanged(thread) {
    return {
        type: THREAD_CHANGED,
        thread
    };
}

export function allThreads(allThreads) {
    return {
        type: ALL_THREADS,
        allThreads
    };
}