const Auth = require('./Auth')

class StudentRouter {

  constructor(app) {
    this.app = app;
    this.setRouters();
  }

  setRouters() {
    const app = this.app;

    this.setGetDashboard(app);
    this.setGetCourses(app);
  }

  setGetDashboard(app) {
    app.get('/', Auth.requireLogin, function(req, res) {
      res.render('index.ejs', {
        page: "home",
        user: req.session.user
      });
    });
  }

  setGetCourses(app) {
    app.get('/courses', Auth.requireStudentLogin, function(req, res) {
      res.render('courselist.ejs', {
        page: ""
      });
    });
  }
}

module.exports = StudentRouter;
