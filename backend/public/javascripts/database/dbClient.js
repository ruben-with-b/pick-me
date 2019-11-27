const MongoClient = require('mongodb').MongoClient;

/** The name of the database belonging to the application. */
const DBNAME_PICK_ME = 'pick_me';
/** The names of the available tables. */
const TABLE_NAME_BAGS = 'bags';
/** The uri where the database is hosted. */
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;
/** Client used to communicate with the database. */
const dbClient = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true},
);

/**
 * Get all available bags. These bags are preconfigured with an illustration
 * and a name suggestion.
 * @return {Promise<Bag[]>}
 */
function getBags() {
  return dbClient.db(DBNAME_PICK_ME)
      .collection(TABLE_NAME_BAGS).find().toArray();
}

module.exports = dbClient;
module.exports.getBags = getBags;
module.exports.DBNAME_PICK_ME = DBNAME_PICK_ME;
module.exports.TABLE_NAME_BAGS = TABLE_NAME_BAGS;

