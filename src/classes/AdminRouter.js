const express = require('express');
const bcrypt = require('bcryptjs');

const Auth = require('./Auth');
const UserAccessor = require('../accessors/UserAccessor');
const User = require('../models/User')

class AdminRouter {

  constructor() {
    const router = express.Router();

    this.setGetDashboardRedirect(router);
    this.setGetDashboard(router);
    this.setGetSettings(router);
    this.setGetManageInstructorAccounts(router);
    this.setPostManageInstructorAccounts(router);
    this.setGetManageStudentAccounts(router);
    this.setGetManageCourses(router);

    this.router = router;
  }

  setGetDashboardRedirect(app) {
    app.get('/', function(req, res) {
      res.redirect('/admin/dashboard');
    });
  }

  setGetDashboard(app) {
    app.get('/dashboard', Auth.requireAdminLogin, function(req, res) {
      res.render('admin/dashboard.ejs', {
        page: '',
        user: req.session.user
      });
    });
  }

  setGetSettings(app) {
    app.get('/settings', Auth.requireAdminLogin, function(req, res) {
      res.render('admin/settings.ejs', {
        page: 'settings',
        user: req.session.user
      });
    });
  }

  setGetManageInstructorAccounts(app) {
    app.get('/manage-instructor-accounts', Auth.requireAdminLogin, function(req, res) {
      res.render('admin/manageinstructoraccounts.ejs', {
        page: "manageinstructoraccounts",
        csrfTocken: req.csrfToken(),
        user: req.session.user
      });
    });
  }

  setPostManageInstructorAccounts(app) {
    app.post('/manage-instructor-accounts', Auth.requireAdminLogin, function(req, res) {
      // First names from form
      let firstNames = req.body.firstName;
      // Last names from form
      let lastNames = req.body.lastName;
      // Email from form
      let emails = req.body.email;
      // Usernames from form
      let usernames = req.body.username;
      // Passwords from form
      let passwords = req.body.password;

      for (let i = 0; i < usernames.length; i++) {
        // Print information
        // console.log('First Name: ' + firstNames[i]);
        // console.log('Last Name: ' + lastNames[i]);
        // console.log('Email: ' + emails[i]);
        // console.log('Username: ' + usernames[i]);
        // console.log('Password: ' + passwords[i]);
        // console.log('-------');

        if (usernames[i]) {
          let hash = bcrypt.hashSync(passwords[i], bcrypt.genSaltSync(10));

          let newUser = new User({
            username: usernames[i],
            firstname: firstNames[i],
            lastname: lastNames[i],
            email: emails[i],
            password: hash,
            usertype: 'instructor'
          });

          console.log();
          console.log('User: ');
          console.log(newUser);

          let result = UserAccessor.addUser(newUser);

          if (result) {
            console.log('success');
          } else {
            console.log('failure');
          }
        }
      }

      res.redirect('manage-instructor-accounts');
    });
  }

  setGetManageStudentAccounts(app) {
    app.get('/manage-student-accounts', Auth.requireAdminLogin, function(req, res) {
      res.render('admin/managestudentaccounts.ejs', {
        page: 'managestudentaccounts',
        user: req.session.user
      });
    });
  }

  setGetManageCourses(app) {
    app.get('/manage-courses', Auth.requireAdminLogin, function(req, res) {
      res.render('admin/managecourses.ejs', {
        page: 'managecourses',
        user: req.session.user
      });
    });
  }

  getRouter() {
    return this.router;
  }

}

module.exports = AdminRouter;
