//  NOT CURRENTLY ACTIVE
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login.ejs', {
    page: "login"
  });
});

module.exports = router;
