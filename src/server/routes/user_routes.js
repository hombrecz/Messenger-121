let User = require('../models/user');
let bodyparser = require('body-parser');
module.exports = function (router) {
    router.use(bodyparser.json());

    router.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(users);
        });
    });

    router.get('/users/:name', function (req, res) {
        User.findOne({name: req.params.name}, function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json(user);
        });
    });

    router.post('/users', function (req, res) {
        var newUser = new User(req.body);

        newUser.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json(user);
        });
    });

};