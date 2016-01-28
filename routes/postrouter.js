/**
 * Created by mayo on 1/26/16.
 */

var router = require('express').Router();
var Post = require('../models/post');

router.route('/').get(function (req, res, next) {
    console.log('Get all posts');
    Post.find(function(err, posts) {
        if (err) {
            console.log("Error: " + err);
            res.json([])
        };
        console.log("Posts: " + posts);
        res.json(posts);
    });
    //res.json(fakePosts);
}).post(function (req, res, next) {
    var post = new Post(req.body);
    console.log('create a post: ' + post);

    post.save(function (err, post) {
        if(err) res.json({'status':'failed'});
        console.log(post.title + ' created successfully');

        res.json(post);
    });

});


module.exports = router;