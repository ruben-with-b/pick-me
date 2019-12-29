'use strict';

/**
 * Represents a bag-template.
 */
class User {
  /**
     * ctor
     * @param {string} username The name of the user.
     * @param {string} mail The mail adress of the user.
     * @param {string} password The password of the user.
     */
  constructor(username, mail, password) {
    this.username = username;
    this.mail = mail;
    this.password = password;
  };
}

module.exports = User;

