const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Auth = require('./Auth');
const User = require('../models/User');
const StudentRouter = require('./StudentRouter');
const AdminRouter = require('./AdminRouter');



/**
 * Main Router for the applicaiton
 *
 * @author Patrick Murphy
 */
class MainRouter {

  /**
   * Constructor for MainRouter excepting express app
   *
   * @param app Express app to run routers from
   */
  constructor(app) {
    this.app = app;
    this.setRouters();

    new StudentRouter(app);

    let adminRouter = new AdminRouter();
    app.use('/admin', adminRouter.getRouter());
  }

  /**
   * Sets routers for the application
   */
  setRouters() {
    const app = this.app;

    this.prepareDatabase();

    this.setMiddleWare(app);

    this.setGetLoginRouter(app);
    this.setPostLoginRouter(app);
    this.setGetLogoutRouter(app);
  }

/**
 * Prepares the user database for the applciation by ensuring there is an admin
 */
  prepareDatabase() {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

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
          usertype: 'admin'
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
  }


  setMiddleWare(app) {
    app.use(function(req, res, next) {
        if (req.session && req.session.user) {
          User.findOne({id: req.session.user._id}, function (err, user) {
            if (user) {
              req.session.user = user;
              delete req.session.user.password;
              req.session.user = req.user;
              res.locals.user = req.user;
            }
            next();
          });
      } else {
        next();
      }
    });
  }

/**
 * Sets the app router for get logging in
 */
  setGetLoginRouter(app) {
    // Get Login Router
    app.get('/login', function(req, res) {
      res.render('login.ejs', {
        page: "login",
        csrfTocken: req.csrfToken(),
        error: ""
      });
    });
  }

  /**
   * Sets the app router for post logging in
   */
  setPostLoginRouter(app) {
    // Post Login Router
    app.post('/login', function(req, res) {
      User.findOne({$or: [{username: req.body.email}, {email: req.body.email}]}, function(err, user) {
        if (!user) {
          res.render('login.ejs', {
            error: "Sorry, account doesn't exist.  You may have incorrect username or email.",
            csrfTocken: req.csrfToken(),
            page: "login"
          });
        } else {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = user;
            res.redirect(Auth.getUserPathFromPermissions(user));
          } else {
            res.render('login.ejs', {
              error: "Sorry, incorrect password.",
              csrfTocken: req.csrfToken(),
              page: "login"
            })
          }
        }
      });
    });

  }

  /**
   * Sets the app router for logging out
   */
  setGetLogoutRouter(app) {
    // Logout router
    app.get('/logout', function(req, res) {
      req.session.reset();
      res.redirect('/login');
    });

  }

}

module.exports = MainRouter;
