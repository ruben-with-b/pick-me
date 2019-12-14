const express = require('express');
const Bags = require('../libs/pickme/logic/Bags');
const WhatsAppMsgBuilder = require('../libs/pickme/logic/WhatsAppMsgBuilder');
const Database = require('../libs/pickme/database/Database');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET bags listing. */
router.get('/', async function(req, res) {
  try {
    const bags = await Bags.getBags();
    res.send(bags);
  } catch (error) {
    res.statusCode = 500;
    res.send({
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
    if (bag._id) {
      // If the bag has an id we should update the existing bag.
      if (!await Database.isObjectIdValid(bag._id)) {
        // Invalid ID
        res.statusCode = 400;
        res.send({
          message:
            `ID '${bag._id}' is invalid ObjectId.`,
        });
      } else if (await Bags.getBag(bag._id)) {
        // Bag exists. Update it!
        const newBag = await Bags.updateBag(bag);
        res.send(newBag);
      } else {
        // There is no existing bag with the specified id.
        res.statusCode = 404;
        res.send({
          message:
            `Cannot update bag. Bag with id '${bag._id}' does not exist! ` +
            `Remove id to create a new bag.`,
        });
      }
    } else {
      // If the bag has no id a new bag must be created.
      // FIXME Improve error-handling if invalid bag is transmitted!
      const newBag = await Bags.addBag(bag);
      res.send(newBag);
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

/* Create a new bag. If the request contains an existing bag, it is updated. */
router.delete('/:id', async function(req, res) {
  const bagId = req.params.id;

  try {
    if (!await Database.isObjectIdValid(bagId)) {
      // Invalid ID
      res.statusCode = 400;
      res.send({
        message:
          `ID '${bagId}' is invalid ObjectId.`,
      });
    } else if (await Bags.deleteBag(bagId)) {
      res.send();
    } else {
      res.statusCode = 404;
      res.send({
        message: `Bag with ID '${bagId}' does not exist.`,
      });
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

/* GET bags listing. */
router.get('/:id/share_on_whatsapp', async function(req, res) {
  const bagId = req.params.id;
  try {
    if (!await Database.isObjectIdValid(bagId)) {
      // Invalid ID
      res.statusCode = 400;
      res.send({
        message:
          `ID '${bagId}' is invalid ObjectId.`,
      });
    } else {
      const bag = await Bags.getBag(bagId);
      if (bag) {
        const msg = WhatsAppMsgBuilder.buildMsg(bag);
        res.send(msg);
      } else {
        res.statusCode = 404;
        res.send({
          message: `Bag with ID '${bagId}' does not exist.`,
        });
      }
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: 'An internal error occurred! We\'re doing our best not to let ' +
        'that happen again.',
    });
    console.error(error);
  }
});

module.exports = router;
