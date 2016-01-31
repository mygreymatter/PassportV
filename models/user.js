/**
 * Created by mayo on 1/27/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    imageid:String,
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password,bcrypt.genSalt(8),null);
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
    return /*bcrypt.compareSync(password,this.password)*/this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    },'SECRET');
};

module.exports = mongoose.model('User',userSchema);