require('dotenv').config();
const dbClient = require('../dbClient');
const bags = require('./bags');

initDB();

/**
 * Initializes the DB.
 * @return {Promise<void>}
 */
async function initDB() {
  try {
    await dbClient.connect();
    if (!await isDBExisting(dbClient.DBNAME_PICK_ME)) {
      dbClient.db(dbClient.DBNAME_PICK_ME)
          .collection(dbClient.TABLE_NAME_BAGS).insertMany(bags);
    }
  } finally {
    dbClient.close();
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


