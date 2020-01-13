'use strict';

const express = require('express');
const Bags = require('../libs/pickme/logic/Bags');
const BagFactory = require('../libs/pickme/logic/BagFactory');
const WhatsAppMsgBuilder = require('../libs/pickme/logic/WhatsAppMsgBuilder');
const Database = require('../libs/pickme/database/Database');
const BagValidator = require('../libs/pickme/utils/BagValidator');
// eslint-disable-next-line new-cap
const router = express.Router();

/** Some predefined messages. */
const INTERNAL_ERROR_MSG = 'An internal error occurred! We\'re doing our ' +
  'best not to let that happen again.';
const invalidObjectIdMsg = (id) => {
  return `ID '${id}' is invalid ObjectId.`;
};

/* GET bags listing from every user. */
router.get('/', async (req, res) => {
  try {
    const bags = await Bags.getBags();
    res.send(bags);
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

/* GET bags from single authenticated user. */
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const bags = await Bags.getBagsByUser(userId);
    res.send(bags);
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});


/* Create a new bag. If the request contains an existing bag, it is updated. */
router.post('/', async (req, res) => {
  try {
    const error = BagValidator.validate(req.body);
    if (error) {
      res.statusCode = 400;
      res.send({
        message: error,
      });
      return;
    }

    const bag = BagFactory.create(req.body);
    if (bag._id) {
      // If the bag has an id we should update the existing bag.
      if (!await Database.isObjectIdValid(bag._id)) {
        // Invalid ID
        res.statusCode = 400;
        res.send({
          message: invalidObjectIdMsg(bag._id),
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
      const newBag = await Bags.addBag(bag);
      res.send(newBag);
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

/* Deletes a bag. */
router.delete('/:id', async (req, res) => {
  const bagId = req.params.id;

  try {
    if (!await Database.isObjectIdValid(bagId)) {
      // Invalid ID
      res.statusCode = 400;
      res.send({
        message: invalidObjectIdMsg(bagId),
      });
    } else {
      const hasBeenDeleted = await Bags.deleteBag(bagId);
      if (hasBeenDeleted) {
        res.send();
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
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

/* Get uri which allows sharing a bag on whatsapp. */
router.get('/:id/share_on_whatsapp', async (req, res) => {
  const bagId = req.params.id;
  try {
    if (!await Database.isObjectIdValid(bagId)) {
      // Invalid ID
      res.statusCode = 400;
      res.send({
        message: invalidObjectIdMsg(bagId),
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
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

module.exports = router;
