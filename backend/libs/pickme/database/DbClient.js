'use strict';

/* TODO Once the authentication is implemented some functions must be adopted
        to fetch only information regarding the currently authenticated user. */

const objectId = require('mongodb').ObjectId;

/**
 * Is used to run some operations on the database.
 */
class DbClient {
  /**
   * ctor
   * @param {MongoClient} mongoClient
   */
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.db = mongoClient.db(process.env.DB_NAME);
    this.bagTemplatesTable =
      this.db.collection(process.env.DB_TABLE_NAME_BAG_TEMPLATES);
    this.bagsTable = this.db.collection(process.env.DB_TABLE_NAME_BAGS);
    this.usersTable = this.db.collection(process.env.DB_TABLE_NAME_USERS);
  }

  /**
   * Starts a new transaction.
   */
  startTransaction() {
    this.session = this.mongoClient.startSession();
    this.session.startTransaction({});
  }

  /**
   * Commits the active transaction.
   * @return {Promise<void>}
   */
  async commitTransaction() {
    await this.session.commitTransaction();
  }

  /**
   * Aborts the active transaction.
   * @return {Promise<void>}
   */
  async abortTransaction() {
    if (this.session && this.session.inTransaction()) {
      await this.session.abortTransaction();
    }
  }

  /**
   * Closes the connection to the db.
   * @return {Promise<void>}
   */
  async close() {
    await this.abortTransaction();

    if (this.mongoClient) {
      await this.mongoClient.close();
    } else {
      console.error('this.mongoClient undefined!');
    }
  };

  /**
   * Get all available bag templates. These bag templates are preconfigured with
   * an illustration and a name suggestion.
   * @return {Promise<Bag[]>}
   */
  getBagTemplates() {
    return this.bagTemplatesTable.find().toArray();
  }

  /**
   * Get the bag with the specified id.
   * @param {string} id The id of the bag to be fetched.
   * @return {Promise<Bag>} The bag.
   */
  async getBag(id) {
    return await this.bagsTable.findOne({'_id': objectId(id)});
  }

  /**
   * Get all bags of the currently authenticated user.
   * @return {Promise<Bag[]>}
   */
  async getBags() {
    return await this.bagsTable.find().toArray();
  }

  /**
   * Get all users.
   * @return {Promise<Users[]>}
   */
  async getUsers() {
    return await this.usersTable.find().toArray();
  }

  /**
   * Adds a new bag.
   * @param {Bag} bag
   * @return {Promise<Bag>} The created bag (including the assigned).
   */
  async addBag(bag) {
    bag._id = await this.bagsTable.insertOne(bag).then((result) => {
      return result.insertedId;
    });
    return bag;
  }

  /**
   * Adds a new user.
   * @param {User} user
   * @return {Promise<User>} The created user (including the assigned).
   */
  async addUser(user) {
    user._id = await this.usersTable.insertOne(user).then((result) => {
      return result.insertedId;
    });
    return user;
  }

  /**
   * Deletes a bag.
   * @param {string} bagId The id of an existing bag.
   * @return {Promise<boolean>}
   * True, if a bag has been deleted, otherwise false.
   */
  async deleteBag(bagId) {
    const result = await this.bagsTable.deleteOne({'_id': objectId(bagId)});
    return result.deletedCount > 0;
  }

  /**
   * Updates the bag.
   * @param {Bag} bag The new version of the bag.
   * @return {Promise<void>}
   */
  async updateBag(bag) {
    const bagWithoutId = Object.assign({}, bag);
    delete bagWithoutId._id;
    await this.bagsTable.updateOne(
        {'_id': objectId(bag._id)},
        {$set: bagWithoutId});
  }
}

module.exports = DbClient;
