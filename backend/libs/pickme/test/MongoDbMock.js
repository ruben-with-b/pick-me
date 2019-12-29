'use strict';

const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');
const DbClient = require('../database/DbClient');

const COLLECTIONS = [
  process.env.DB_TABLE_NAME_BAGS,
  process.env.DB_TABLE_NAME_BAG_TEMPLATES,
];

/**
 * (Inspired by https://stackoverflow.com/questions/13607732/in-memory-mongodb-for-test)
 */
class MongoDbMock {
  /** ctor */
  constructor() {
    this.mongoMemoryServer = new MongoMemoryServer();
  }

  /**
   * @return {function} Function mocking the Database.connect-function.
   * Instead of returning a DbClient operating on the productive database
   * this implementation returns a DbClient operating on an in-memory-database.
   */
  getMockConnect() {
    return jest.fn().mockImplementation(async () => {
      return new DbClient(await this.getMongoDbClient());
    });
  }

  /**
   * Stop mongo-memory-server.
   */
  async stop() {
    await this.mongoMemoryServer.stop();
  }

  /**
   * Delete all content.
   */
  async cleanup() {
    const mongoDbClient = await this.getMongoDbClient();
    try {
      const db = mongoDbClient.db(process.env.DB_NAME);
      await Promise.all(
          COLLECTIONS.map((c) => db.collection(c).deleteMany({})),
      );
    } finally {
      await mongoDbClient.close();
    }
  }

  /**
   * @return {Promise<MongoClient>} MongoClient which operates on an
   * in-memory-database.
   */
  async getMongoDbClient() {
    const uri = await this.mongoMemoryServer.getConnectionString();
    return MongoClient.connect(uri, {useUnifiedTopology: true});
  }
}

module.exports = MongoDbMock;
