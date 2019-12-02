const express = require('express');
const Database = require('../libs/pickme/database/Database');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET bags listing. */
router.get('/', async function(req, res) {
  const dbClient = await Database.connect();
  try {
    const bags = await dbClient.getBags();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(bags);
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

/* Create a new bag. If the request contains an existing bag, it is updated. */
router.post('/', async function(req, res) {
  const bag = req.body;

  const dbClient = await Database.connect();
  try {
    let newBag;
    if (bag._id) {
      await dbClient.updateBag(bag);
      newBag = bag;
    } else {
      newBag = await dbClient.addBag(bag);
    }
    res.send(newBag);
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

/* Create a new bag. If the request contains an existing bag, it is updated. */
router.delete('/', async function(req, res) {
  const bag = req.body;

  const dbClient = await Database.connect();
  try {
    await dbClient.deleteBag(bag);
    res.send();
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
