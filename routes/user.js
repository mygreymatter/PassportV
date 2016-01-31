/**
 * Created by mayo on 1/29/16.
 */

module.exports = function (app) {
  var User = require('../models/user');

    app.get('/user/imageid', function (req,res) {
        //console.log('Get User: '+ Object.keys(req.query));
        console.log('Get User: '+ req.query.username);
        User.findOne({'username': req.query.username},
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
                return res.json({imageid:user.imageid});
            });

    });

    app.post('/user/updateimage', function (req, res) {
        console.log('-------------Updating Image----------------');
        console.log('User: ' + Object.keys(req.body.user));
        console.log('Imageid: ' + req.body.image_id);
        console.log('------------------------------------------');
        var user = req.body.user;

        User.findByIdAndUpdate(user._id,{imageid:req.body.image_id}, function (err, user) {
            if(err){
                console.log('UpdateImage failed: ' + err);
                return res.status(500).json({status: 'User image update failed!'});
            }
            console.log('UpdateImage success: ' + user);
            return res.json({status: 'success',imageid: req.body.image_id});
        });
    });
};