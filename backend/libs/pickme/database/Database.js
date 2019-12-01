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

  /** Closes the connection to the db. */
  async close() {
    if (this.mongoClient) {
      await this.mongoClient.close();
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
   * Get all bags of the currently authenticated user.
   * @return {Promise<Bag>}
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
   * @param {Bag} bag The bag to be removed.
   * @return {Promise<void>}
   */
  async deleteBag(bag) {
    await this.bagsTable.deleteOne({'_id': objectId(bag._id)});
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
module.exports.DBNAME_PICK_ME = DBNAME_PICK_ME;
module.exports.TABLE_NAME_BAGS = TABLE_NAME_BAGS;
module.exports.TABLE_NAME_BAG_TEMPLATES = TABLE_NAME_BAG_TEMPLATES;
