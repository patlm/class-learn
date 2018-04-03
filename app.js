require('dotenv').load();
var express = require('express');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');


//Fire up express and basic setup
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: true});

//Bycrypt Security Options
app.use(sessions({
    cookieName: 'session',
    secret: 'asd68kldsalkweioqeiode3kds86sdfnsd',
    duration: 6 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, //don't let javascript ever acess cookies
    secure: true, //Only use cookies over https
    ephemeral: true
}));

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(urlencodedParser);
app.use(csrf());

//Route vars
var main = require('./controllers/main.js');
var login = require('./controllers/login.js');

//Routes use
app.use('/', main);
//app.use('/login', login);

//Starting server
app.listen(process.env.PORT, function() {
  console.log("Listening on port " + process.env.PORT);
});
