/**
 * Created by mayo on 1/26/16.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var busboyBodyParser = require('busboy-body-parser');
var configDB = require('./config/db');

var app = express();
var PORT = process.env.PORT | 5000;

mongoose.connect(configDB.url);
require('./config/passport')(passport);

var postRouter = require('./routes/postrouter');
//var authRouter = require('./routes/authrouter');

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
    secret:'ILOVESCOTCH',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(busboyBodyParser());

app.use('/posts',postRouter);
/*app.use(authRouter(passport));*/
require('./routes/authrouter.js')(app,passport);
require('./routes/uploadrouter.js')(app);
require('./routes/user.js')(app);

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
})

app.listen(PORT, function () {
    console.log("App running at http://127.0.0.1:5000");
});