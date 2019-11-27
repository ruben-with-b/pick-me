const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const dbClient = require('../public/javascripts/database/dbClient.js');

/* GET bags listing. */
router.get('/', function(req, res) {
  dbClient.connect().then(() => {
    return dbClient.getBags();
  }).then((bags) => {
    res.send(bags);
  }).finally(() => {
    dbClient.close();
  });
});

module.exports = router;
