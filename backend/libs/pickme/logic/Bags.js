const Database = require('../database/Database');
const NotificationScheduler = require('./NotificationScheduler');

/**
 * Manages the bags.
 */
class Bags {
  /**
   * @return {Promise<Bag[]>} All of my bags.
   */
  static async getBags() {
    const dbClient = await Database.connect();
    try {
      return await dbClient.getBags();
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Updates an existing bag.
   * @param {Bag} bag An existing bag (must contain an id).
   * @return {Promise<Bag>} The new version of the bag.
   */
  static async updateBag(bag) {
    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      await dbClient.updateBag(bag);
      NotificationScheduler.scheduleNotification(bag);
      await dbClient.commitTransaction();
      return bag;
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Adds a new bag.
   * @param {Bag} bag An existing bag (must not contain an id).
   * @return {Promise<Bag>} The newly created bag (contains the assigned id).
   */
  static async addBag(bag) {
    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      const newBag = await dbClient.addBag(bag);
      NotificationScheduler.scheduleNotification(bag);
      await dbClient.commitTransaction();
      return newBag;
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Deletes an existing bag.
   * @param {Bag} bag An existing bag (must contain an id).
   * @return {Promise<void>}
   */
  static async deleteBag(bag) {
    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      await dbClient.deleteBag(bag);
      NotificationScheduler.abortScheduledNotification(bag);
      await dbClient.commitTransaction();
    } finally {
      await dbClient.close();
    }
  }
}

module.exports = Bags;
