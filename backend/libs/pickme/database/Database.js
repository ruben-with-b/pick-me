const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
/** The uri where the database is hosted. */
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
  `@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;
/** The name of the database belonging to the application. */
const DBNAME_PICK_ME = 'pick_me';
/** The names of the available tables. */
const TABLE_NAME_BAG_TEMPLATES = 'bag_templates';
const TABLE_NAME_BAGS = 'bags';

/* TODO Once the authentication is implemented some functions must be adopted
        to fetch only information regarding the currently authenticated user. */

/**
 * Initializes dbClient.
 * @return {Promise<DbClient>}
 */
const connect = async function() {
  const mongoDbClient = await MongoClient.connect(URI,
      {useUnifiedTopology: true});
  return new DbClient(mongoDbClient);
};

/**
 * Checks whether id is a valid ObjectId.
 * @param {string} id The id to be checked.
 * @return {Promise<boolean>} True, if the id is valid, otherwise false.
 */
const isObjectIdValid = async function(id) {
  try {
    objectId(id);
  } catch (e) {
    return false;
  }
  return true;
};

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
    this.db = mongoClient.db(DBNAME_PICK_ME);
    this.bagTemplatesTable = this.db.collection(TABLE_NAME_BAG_TEMPLATES);
    this.bagsTable = this.db.collection(TABLE_NAME_BAGS);
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
    await this.session.abortTransaction();
  }

  /** Closes the connection to the db. */
  async close() {
    if (this.session && this.session.inTransaction()) {
      await this.session.abortTransaction();
    }

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
   * @return {Bag} The bag.
   */
  getBag(id) {
    return this.bagsTable.findOne({'_id': objectId(id)});
  }

  /**
   * Get all bags of the currently authenticated user.
   * @return {Promise<Bag[]>}
   */
  getBags() {
    return this.bagsTable.find().toArray();
  }

  /**
   * Adds a new bag.
   * @param {Bag} bag
   * @return {Bag} The created bag (including the assigned).
   */
  async addBag(bag) {
    bag._id = await this.bagsTable.insertOne(bag).then((result) => {
      return result.insertedId;
    });
    return bag;
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

module.exports.DbClient = DbClient;
module.exports.connect = connect;
module.exports.isObjectIdValid = isObjectIdValid;
module.exports.DBNAME_PICK_ME = DBNAME_PICK_ME;
module.exports.TABLE_NAME_BAGS = TABLE_NAME_BAGS;
module.exports.TABLE_NAME_BAG_TEMPLATES = TABLE_NAME_BAG_TEMPLATES;
