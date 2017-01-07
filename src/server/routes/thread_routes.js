let Thread = require('../models/thread');
let bodyparser = require('body-parser');
module.exports = function (router) {
    router.use(bodyparser.json());

    router.get('/threads', function (req, res) {
        Thread.find({}, function (err, threads) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(threads);
        });
    });

    router.get('/threads/:name', function (req, res) {
        Thread.findOne({name: req.params.name}, function (err, thread) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json(thread);
        });
    });

    router.post('/threads/:name', function (req, res) {
        Thread.findOne({name: req.params.name}, function (err, thread) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            thread.messages.push(req.body);
            thread.save(function (err, updatedThread) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                }
                res.send(updatedThread);
            });
        });
    });

    router.post('/threads', function (req, res) {
        let newThread = new Thread(req.body);

        newThread.save(function (err, thread) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json(thread);
        });
    });
};