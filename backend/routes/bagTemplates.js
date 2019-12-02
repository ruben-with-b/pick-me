const express = require('express');
const Database = require('../libs/pickme/database/Database');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET bags listing. */
router.get('/', async function(req, res) {
  const dbClient = await Database.connect();
  try {
    const bagTemplates = await dbClient.getBagTemplates();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(bagTemplates);
  } catch (error) {
    res.status(500).send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.log(error);
  } finally {
    await dbClient.close();
  }
});

module.exports = router;
