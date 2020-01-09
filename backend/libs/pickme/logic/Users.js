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
      return (await dbClient.getUsers()).map((user) => UserCreator.create(user));
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Adds a new user.
   * @param {User} rawUser An existing user (must not contain an id).
   * @return {Promise<User>}
   * The newly created user (contains the assigned id).
   */
  static async addUser(rawUser) {
    const user = UserCreator.create(rawUser);
    if (!user) {
      throw new Error(`${rawUser} is malformed User`);
    }

    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      const newUser = await dbClient.addUser(user);
      await dbClient.commitTransaction();
      return newUser;
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Updates an existing user.
   * @param {User} rawUser An existing user (must contain an id).
   * @return {Promise<User>}
   * The new version of the user.
   */
  static async updateUser(rawUser) {
    const user = UserCreator.create(rawUser);
    if (!user) {
      throw new Error(`${rawUser} is malformed User`);
    }

    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      await dbClient.updateUser(user);
      await dbClient.commitTransaction();
      return user;
    } finally {
      await dbClient.close();
    }
  }
}

module.exports = Users;
