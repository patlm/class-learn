var express = require('express');
var router = express.Router();
var app = express();

var auth = require('./auth.js');

router.get('/', function(req, res) {
  res.redirect('/admin/dashboard');
});

router.get('/dashboard', auth.requireAdminLogin, function(req, res) {
  res.render('admin/dashboard.ejs', {
    page: '',
    user: req.session.user
  });
});

router.get('/settings', auth.requireAdminLogin, function(req, res) {
  res.render('admin/settings.ejs', {
    page: 'settings',
    user: req.session.user
  });
});

router.get('/manage-instructor-accounts', auth.requireAdminLogin, function(req, res) {
  res.render('admin/manageinstructoraccounts.ejs', {
    page: "manageinstructoraccounts",
    user: req.session.user
  });
});

router.get('/manage-student-accounts', auth.requireAdminLogin, function(req, res) {
  res.render('admin/managestudentaccounts.ejs', {
    page: "managestudentaccounts",
    user: req.session.user
  });
});

router.get('/manage-courses', auth.requireAdminLogin, function(req, res) {
  res.render('admin/managecourses.ejs', {
    page: 'managecourses',
    user: req.session.user
  });
});

module.exports = router;
