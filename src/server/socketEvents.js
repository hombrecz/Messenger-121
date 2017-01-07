let User = require('./models/user');
let Thread = require('./models/thread');
let mongoose = require('mongoose');

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('user connected');
        socket.emit('connected');

        socket.on('log user', function (username) {
            signIn(socket, username);
        });

        socket.on('create thread', function (threadName) {
            createThread(threadName, io);
        });

        socket.on('change thread', function (currentThread, newThread) {
            changeThread(currentThread, newThread, socket);
        });

        socket.on('new message', function (activeThreadName, message) {
            sendMessage(activeThreadName, message, io);
        });

        socket.on('get threads', function () {
            getThreads(socket);
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });

};

function signIn(socket, username) {
    User.findOne({name: username}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            socket.emit('user logged', user)
        } else {
            let newUser = new User({name: username});

            newUser.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                socket.emit('user logged', user)
            });
        }
    });
}

function changeThread(currentThread, newThread, socket) {
    Thread.findOne({name: newThread}, function (err, thread) {
        if (err) {
            console.log(err);
        }
        if (thread) {
            socket.leave(currentThread);
        }
        socket.join(newThread);
        socket.emit('thread changed', thread);
    });
}

function createThread(threadName, io) {
    Thread.find({name: threadName}, function (err, thread) {
        if (err) {
            console.log(err);
        }
        if (!thread._id) {
            let newThread = new Thread({name: threadName, messages: []});
            newThread.save(function (err, thread) {
                if (err) {
                    console.log(err);
                }
                Thread.find({}, function (err, threads) {
                    if (err) {
                        console.log(err);
                    }
                    io.emit('all threads', threads);
                });
            });
        }
    });
}

function sendMessage(activeThreadName, message, io) {
    Thread.findOne({name: activeThreadName}, function (err, thread) {
        if (err) {
            console.log(err);
        }

        thread.messages.push(message);
        thread.save(function (err, updatedThread) {
            if (err) {
                console.log(err);
            }
            io.in(activeThreadName).emit('thread changed', updatedThread);
        });
    });
}

function getThreads(socket) {
    Thread.find({}, function (err, threads) {
        if (err) {
            console.log(err);
        }
        socket.emit('all threads', threads);
    });
}