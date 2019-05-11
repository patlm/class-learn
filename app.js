require('dotenv').load();
var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');

var MainRouter = require('./src/classes/MainRouter');

//Fire up express and basic setup
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Sessions settings middleware
app.use(sessions({
    cookieName: 'session',
    secret: 'asd68kldsalkweioqeiode3kds86sdfnsd',
    duration: 6 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, //don't let javascript ever acess cookies
    secure: true, //Only use cookies over https
    ephemeral: true
}));

app.use(urlencodedParser);

app.use(csrf());

new MainRouter(app);

//Starting server
app.listen(process.env.PORT, function() {
  console.log("Listening on port " + process.env.PORT);
});
