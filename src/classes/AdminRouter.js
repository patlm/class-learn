const express = require('express');
const Auth = require('./Auth');

class AdminRouter {

  constructor() {
    const router = express.Router();

    this.setGetDashboardRedirect(router);
    this.setGetDashboard(router);
    this.setGetSettings(router);
    this.setGetManageInstructorAccounts(router);
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
        user: req.session.user
      });
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
