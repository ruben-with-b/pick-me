const express = require('express');
const Bags = require('../libs/pickme/logic/Bags');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET bags listing. */
router.get('/', async function(req, res) {
  try {
    const bags = await Bags.getBags();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(bags);
  } catch (error) {
    res.status(500).send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

/* Create a new bag. If the request contains an existing bag, it is updated. */
router.post('/', async function(req, res) {
  const bag = req.body;

  try {
    let newBag;
    if (bag._id) {
      newBag = await Bags.updateBag(bag);
    } else {
      newBag = await Bags.addBag(bag);
    }
    res.send(newBag);
  } catch (error) {
    res.status(500).send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

/* Create a new bag. If the request contains an existing bag, it is updated. */
router.delete('/', async function(req, res) {
  const bag = req.body;

  try {
    await Bags.deleteBag(bag);
    res.send();
  } catch (error) {
    res.status(500).send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

module.exports = router;
