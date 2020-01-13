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
      return (await dbClient.getUsers()).map(
          (user) => UserCreator.create(user));
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Selects a user by mail.
   * @param {Mail} rawMail The Mail adress of an existing user.
   * @return {Promise<User>}
   * The user containing this mail adress.
   */
  static async selectByMail(rawMail) {
    const dbClient = await Database.connect();
    try {
      return (await dbClient.getUser(rawMail));
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

  /**
   * Deletes an existing user.
   * @param {string} userId The id of an existing user.
   * @return {Promise<boolean>}
   * True, if a user has been deleted, otherwise false.
   */
  static async deleteUser(userId) {
    if (!await Database.isObjectIdValid(userId)) {
      throw new Error(`${userId} is invalid ObjectId`);
    }

    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      const itemDeleted = await dbClient.deleteUser(userId);
      await dbClient.commitTransaction();
      return itemDeleted;
    } finally {
      await dbClient.close();
    }
  }
}

module.exports = Users;
