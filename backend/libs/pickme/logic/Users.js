'use strict';

const Database = require('../database/Database');
const UserCreator = require('./UserCreator');

/**
 * Manages the users.
 */
class Users {
  /**
   * @return {Promise<Users[]>} All the users.
   */
  static async getUsers() {
    const dbClient = await Database.connect();
    try {
      return (await dbClient.getUsers()).map((bag) => UserCreator.create(bag));
    } finally {
      await dbClient.close();
    }
  }
}

module.exports = Users;
