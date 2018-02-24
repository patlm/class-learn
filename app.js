var express = require('express');


//Fire up express and basic setup
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Route vars
var main = require('./controllers/main.js');
var login = require('./controllers/login.js');

//Routes use
app.use('/', main);
app.use('/login', login);

//Starting server
app.listen(3000, function() {
  console.log("Listening on port 3000");
});
