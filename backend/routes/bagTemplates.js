const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const dbClient = require('../libs/database/dbClient.js');

/* GET bags listing. */
router.get('/', function(req, res) {
  dbClient.connect().then(() => {
    return dbClient.getBagTemplates();
  }).then((bags) => {
    res.send(bags);
  }).catch((error) => {
    res.status(500).send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.log(error);
  }).finally(() => {
    dbClient.close();
  });
});

module.exports = router;
