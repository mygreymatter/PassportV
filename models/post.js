/**
 * Created by mayo on 1/26/16.
 */

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Post',postSchema);