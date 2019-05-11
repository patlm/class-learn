/**
 * Class containing static methods dealing with the authentication of a user
 *
 * @author Patrick Murphy
 */

let Auth = {};

/**
 * Returns path for user to appropriate page based off of there permission
 *
 * student: /
 * instructor: /instructor
 * admin: /admin
 *
 * @param user User - current user of the application
 * @return Appropriate path for user based off of their permissions
 */
Auth.getUserPathFromPermissions = function(user) {
  if (user.usertype === 'student') {
    return '/';
  } else if (user.usertype === 'instructor') {
    return '/';
    console.log('Redirect to teacher');
  } else if (user.usertype === 'admin') {
    return '/admin';
  } else {
    console.log('Failed to recognize type of user');
  }
}

/**
 * Middleware to use to require a login in order to continue.  If user not found, will redirect to login page otherwise proceeds
 *
 * @param req request
 * @param res response
 * @param next next
 */
Auth.requireLogin = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

/**
 * Middleware to use to require an admin login in order to continue.  If not admin user, will redirect to home screen for user otherwise redirects to login.  If all is correct, will proceed.
 *
 * @param req request
 * @param res response
 * @param next next
 */
Auth.requireAdminLogin = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else if (req.session.user.usertype !== 'admin') {
    res.redirect(Auth.getUserPathFromPermissions(req.session.user));
  } else {
    next();
  }
}

/**
* Middleware to use to require a instructor login in order to continue.  If not instructor user, will redirect to home screen for user otherwise redirects to login.  If all is correct, will proceed.
*
* @param req request
* @param res response
* @param next next
*/
Auth.requireInstructorLogin = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else if(req.session.user.usertype !='instructor') {
    res.redirect(Auth.getUserPathFromPermissions(req.session.user));
  } else {
    next();
  }
}

/**
* Middleware to use to require a student login in order to continue.  If not student user, will redirect to home screen for user otherwise redirects to login.  If all is correct, will proceed.
*
* @param req request
* @param res response
* @param next next
*/
Auth.requireStudentLogin = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else if (req.session.user.usertype !='student') {
    res.redirect(Auth.getUserPathFromPermissions(req.session.user));
  } else {
    next();
  }
}

/**
 * Exports the authentication object (Auth)
 * @type Auth
 */
module.exports = Auth;
