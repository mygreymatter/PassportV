/**
 * Created by mayo on 1/27/16.
 */

module.exports = function (app, passport) {
    var User = require('../models/user');
    var responses = require('../config/responses');

    app.post('/signup', function (req, res, next) {
        if (!req.body.username || !req.body.password)
            return res.status(500).json({status: responses.MISSING_DETAILS});

        console.log('Router signup: ' + req.body.username + " " + req.body.password);

        var user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password)

        console.log('Saving USer: ' + user);
        user.save(function (err) {

            if (err) {
                console.log('Save Error: ' + err.code);
                if (err.code === 11000)
                    return res.status(500).json({status: responses.USERNAME_TAKEN});
            }

            console.log('Saved: ' + user);
            return res.json({status: responses.SUCCESS, user: user, token: user.generateJWT()});
        });

    });

    app.post('/login', function (req, res, next) {
        console.log('authrouter login: ' + req.body.username);
        if (!req.body.username || !req.body.password)
            return res.status(500).json({status: responses.MISSING_DETAILS});


        User.findOne({'username': req.body.username},
            function (err, user) {
                if (err) {
                    console.log("Found Error: " + err);
                    return res.status(500).json({status: responses.FAILURE, reason: err});
                }

                if (user == null) {
                    console.log('User is null ');
                    return res.status(500).json({status: responses.USER_NOT_EXIST});
                }

                console.log("Found User: " + user);
                if (user.validPassword(req.body.password))
                    return res.json({status: 'successful login', token: user.generateJWT()});
                return res.status(500).json({status: responses.INVALID_PASSWORD});
            });
    });
};
