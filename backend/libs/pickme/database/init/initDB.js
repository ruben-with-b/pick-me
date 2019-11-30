require('dotenv').config();
const dbClient = require('../dbClient');
const bagTemplates = require('./bagTemplates');
const bags = require('./bags');

initDB();

/**
 * Initializes the DB.
 * @return {Promise<void>}
 */
async function initDB() {
  await dbClient.connect();
  const session = dbClient.startSession();
  session.startTransaction({});
  try {
    if (!await isDBExisting(dbClient.DBNAME_PICK_ME)) {
      dbClient.db(dbClient.DBNAME_PICK_ME)
          .collection(dbClient.TABLE_NAME_BAG_TEMPLATES)
          .insertMany(bagTemplates);
      console.log('Inserting bag templates successfully finished.');
      dbClient.db(dbClient.DBNAME_PICK_ME)
          .collection(dbClient.TABLE_NAME_BAGS)
          .insertMany(bags);
      console.log('Inserting bags successfully finished.');
    }
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
  } finally {
    await dbClient.close();
  }
}

/**
 * Checks, if the given DB is existing.
 * @param {string} dbName The name of the db to be checked.
 * @return {Promise<boolean>} True, if the DB exists, otherwise false.
 */
async function isDBExisting(dbName) {
  const result = await dbClient.db('admin').admin()
      .listDatabases({nameOnly: true});
  return result.databases.includes(dbName);
}


