const mongoose = require('mongoose');

/**
 * Provides access to the user database
 *
 * @author Patrick Murphy
 */

let UserAccessor = {};

/**
 * Adds user to the user database
 *
 * @param  {User} user User to add to the database
 * @return {boolean} Returns true of success or false if unsuccessful
 */
UserAccessor.addUser = function(user) {
  user.save(function(err) {
    if (err) {
      console.log('Error!');
      return false;
    } else {
      console.log('Successfully added ' + user.username);
      return true;
    }
  });
}

module.exports = UserAccessor;
