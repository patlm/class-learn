var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var router = express.Router();
var app = express();

//MongoDB Database setup ------------------------------------------------------
mongoose.connect(process.env.MONGO_URI);

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

//User Schema
var User = mongoose.model('User', new Schema({
  id: ObjectId,
  username: {type: String, unique: true},
  firstname: String,
  lastname: String,
  email: {type: String, unique: true},
  password: String,
  usertype: String
}));

//Course Schema
var Course = mongoose.model('Course', new Schema({
  id: ObjectId,
  courseID: Number,
  name: String,
  courseAdmin: String
}));

//Middle Ware -----------------------------------------------------------------
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({id: req.session.user.id}, function (err, user) {
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = req.user;
          res.locals.user = req.user;
        }
        next();
      });
    } else {
      next();
    }
  });

function requireLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
}

//Bycrpt


//Create admin account if doesn't exist
User.findOne({username: process.env.ADMIN_USERNAME}, function(err, user) {
  if(err) {
    console.log(err);
  }
  var message;
  if(user) {
    console.log();
    console.log("Admin account exists!");
  } else {
    console.log("No admin exists");
    console.log("Creating admin user with");
    console.log("Username: " + process.env.ADMIN_USERNAME);
    console.log("Passowrd: " + process.env.ADMIN_PASSWORD);

    var hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(10));
    var newAdmin = new User({
      username: process.env.ADMIN_USERNAME,
      firstname: "",
      lastname: "",
      email: 'N/A',
      password: hash,
      type: 'admin'
    });

    newAdmin.save(function(err) {
      if (err) {
        console.log();
        console.log("Something went wrong");
      } else {
        console.log();
        console.log("Successfully created admin account!")
      }
    });
  }
});

//Routers ---------------------------------------------------------------------
router.get('/', requireLogin, function(req, res) {
  res.render('index.ejs', {
    page: "home",
    user: req.session.user
  });
});

router.get('/courses', function(req, res) {
  res.render('courselist.ejs', {
    page: ""
  });
});

router.get('/login', function(req, res) {
  res.render('login.ejs', {
    page: "login",
    csrfTocken: req.csrfToken(),
    error: ""
  });
});

router.post('/login', function(req, res) {
  User.findOne({$or: [{username: req.body.email}, {email: req.body.email}]}, function(err, user) {
    if (!user) {
      res.render('login.ejs', {error: "Sorry, account doesn't exist.  You may have incorrect username or email.", csrfTocken: req.csrfToken(), page: "login"})
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login.ejs', {error: "Sorry, incorrect password.", csrfTocken: req.csrfToken(), page: "login"})
      }
    }
  });
});

router.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/login')
  })

module.exports = router;
