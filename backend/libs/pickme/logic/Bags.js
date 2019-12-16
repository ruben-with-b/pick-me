const Database = require('../database/Database');
const NotificationScheduler = require('./NotificationScheduler');
const BagFactory = require('./BagFactory');

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
      return (await dbClient.getBags()).map((bag) => BagFactory.create(bag));
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Updates an existing bag.
   * @param {Bag} rawBag An existing bag (must contain an id).
   * @return {Promise<Bag>}
   * The new version of the bag.
   */
  static async updateBag(rawBag) {
    const bag = BagFactory.create(rawBag);
    if (!bag) {
      throw new Error(`${rawBag} is malformed Bag`);
    }

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
   * @param {Bag} rawBag An existing bag (must not contain an id).
   * @return {Promise<Bag>}
   * The newly created bag (contains the assigned id).
   */
  static async addBag(rawBag) {
    const bag = BagFactory.create(rawBag);
    if (!bag) {
      throw new Error(`${rawBag} is malformed Bag`);
    }

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
   * @param {string} bagId The id of an existing bag.
   * @return {Promise<boolean>}
   * True, if a bag has been deleted, otherwise false.
   */
  static async deleteBag(bagId) {
    if (!await Database.isObjectIdValid(bagId)) {
      throw new Error(`${bagId} is invalid ObjectId`);
    }

    const dbClient = await Database.connect();
    dbClient.startTransaction();
    try {
      const itemDeleted = await dbClient.deleteBag(bagId);
      if (itemDeleted) {
        NotificationScheduler.abortScheduledNotification(bagId);
      }
      await dbClient.commitTransaction();
      return itemDeleted;
    } finally {
      await dbClient.close();
    }
  }

  /**
   * Get bag by id.
   * @param {string} bagId The id of the bag.
   * @return {Promise<Bag>}
   * Bag or undefined, if there is no bag with the specified id.
   */
  static async getBag(bagId) {
    if (!await Database.isObjectIdValid(bagId)) {
      throw new Error(`${bagId} is invalid ObjectId`);
    }

    const dbClient = await Database.connect();
    try {
      const rawBag = await dbClient.getBag(bagId);
      if (rawBag) {
        return await BagFactory.create(rawBag);
      } else {
        return undefined;
      }
    } finally {
      await dbClient.close();
    }
  }
}

module.exports = Bags;
