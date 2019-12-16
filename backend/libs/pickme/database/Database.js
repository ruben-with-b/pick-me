const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const DbClient = require('./DbClient');

/**
 * Some basic Database-functions.
 */
class Database {
  /**
   * Initializes dbClient.
   * @return {Promise<DbClient>}
   */
  static async connect() {
    const mongoDbClient = await MongoClient.connect(process.env.DB_URI,
        {useUnifiedTopology: true});
    return new DbClient(mongoDbClient);
  };

  /**
   * Checks whether id is a valid ObjectId.
   * @param {string} id The id to be checked.
   * @return {Promise<boolean>} True, if the id is valid, otherwise false.
   */
  static async isObjectIdValid(id) {
    try {
      objectId(id);
    } catch (e) {
      return false;
    }
    return true;
  };
}

module.exports = Database;
