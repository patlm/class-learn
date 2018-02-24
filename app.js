var express = require('express');


//Fire up express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

var login = require('controllers/login.js')

app.use('/login', login)

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
