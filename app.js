var express = require('express');


//Fire up express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
