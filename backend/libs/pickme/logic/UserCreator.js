'use strict';

const User = require('../model/User');

/** Enables the creation of valid users. */
class UserCreator {
  /**
   * Creates bag from any object you assume to be a bag. If the given object
   * is no bag you will get 'undefined'.
   * @param {any} rawUser Something you assume to be a user.
   * @return {User|undefined} User or 'undefined'.
   */
  static create(rawUser) {
    const user = new User(rawUser.username, rawUser.mail, rawUser.password);

    user._id = rawUser._id;

    // Each user must have a name.
    if (!user.username || !user.mail || !user.password ) {
      return undefined;
    }

    return user;
  };
}

module.exports = UserCreator;
