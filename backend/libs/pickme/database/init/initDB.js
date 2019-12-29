'use strict';

/** Initializes the database with some demo bags and bag-templates. */
require('dotenv').config();
const Database = require('../Database');
const bagTemplates = require('./bagTemplates');
const bags = require('./bags');

initDB().catch((error) => {
  console.error(error);
});

/**
 * Initializes the DB.
 * @return {Promise<void>}
 */
async function initDB() {
  const dbClient = await Database.connect();
  dbClient.startTransaction();
  try {
    if (!await isDBExisting(dbClient, process.env.DB_NAME)) {
      dbClient.mongoClient.db(process.env.DB_NAME)
          .collection(process.env.DB_TABLE_NAME_BAG_TEMPLATES)
          .insertMany(bagTemplates);
      console.log('Inserting bag templates successfully finished.');
      dbClient.mongoClient.db(process.env.DB_NAME)
          .collection(process.env.DB_TABLE_NAME_BAGS)
          .insertMany(bags);
      console.log('Inserting bags successfully finished.');
    }
    await dbClient.commitTransaction();
  } finally {
    await dbClient.close();
  }
}

/**
 * Checks, if the given DB is existing.
 * @param {DbClient} dbClient The dbClient to communicate with the DB.
 * @param {string} dbName The name of the db to be checked.
 * @return {Promise<boolean>} True, if the DB exists, otherwise false.
 */
async function isDBExisting(dbClient, dbName) {
  const result = await dbClient.mongoClient.db('admin').admin()
      .listDatabases({nameOnly: true});
  return result.databases.includes(dbName);
}


