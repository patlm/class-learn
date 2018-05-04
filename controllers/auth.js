function correctRedirect (user) {
  if (user.usertype == "student") {
    return '/';
  } else if (user.usertype == "instructor") {
    console.log("redirect teacher");
  } else if (user.usertype == "admin") {
    return '/admin';
    console.log('selected correct');
  } else {
    console.log("falied identifying usertype on login");
  }
}

module.exports = {
  correctRedirect: function(user) {
    return correctRedirect(user);
  },

  requireLogin: function(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  },

  requireAdminLogin: function(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else if (req.session.user.usertype != 'admin') {
      res.redirect(correctRedirect(req.session.user))
    } else {
      next();
    }
  },

  requireInstructorLogin: function(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else if(req.session.user.usertype !='instructor') {
      res.redirect(correctRedirect(req.session.user))
    } else {
      next();
    }
  },

  requireStudentLogin: function(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else if (req.session.user.usertype !='student') {
      res.redirect(correctRedirect(req.session.user))
    } else {
      next();
    }
  }
}
