'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Database = require('../libs/pickme/database/Database');
const Users = require('../libs/pickme/logic/Users');
const UserCreator = require('../libs/pickme/logic/UserCreator');

/** Some predefined messages. */
const INTERNAL_ERROR_MSG = 'An internal error occurred! We\'re doing our ' +
  'best not to let that happen again.';
const invalidObjectIdMsg = (id) => {
  return `ID '${id}' is invalid ObjectId.`;
};

// Get a user
router.get('/', async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.send(users);
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const user = UserCreator.create(req.body);
    if (!user) {
      res.statusCode = 400;
      res.send({
        message:
          `Request body does not contain valid user: ` +
          `${JSON.stringify(req.body)}`,
      });
    } else if (user._id) {
      // If the user has an id we should update the existing user.
      if (!await Database.isObjectIdValid(user._id)) {
        // Invalid ID
        res.statusCode = 400;
        res.send({
          message: invalidObjectIdMsg(user._id),
        });
      } else if (await Users.getUser(user._id)) {
        // User exists. Update it!
        const newUser = await Users.updateUser(user);
        res.send(newUser);
      } else {
        // There is no existing user with the specified id.
        res.statusCode = 404;
        res.send({
          message:
            `Cannot update user. User with id '${user._id}' does not exist! ` +
            `Remove id to create a new user.`,
        });
      }
    } else {
      // If the user has no id a new user must be created.
      const newUser = await Users.addUser(user);
      res.send(newUser);
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({
      message: INTERNAL_ERROR_MSG,
    });
    console.error(error);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    if (!await Database.isObjectIdValid(userId)) {
      // Invalid ID
      res.statusCode = 400;
      res.send({
        message: invalidObjectIdMsg(userId),
      });
    } else {
      const hasBeenDeleted = await Users.deleteUser(userId);
      if (hasBeenDeleted) {
        res.send();
      } else {
        res.statusCode = 404;
        res.send({
          message: `User with ID '${userId}' does not exist.`,
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
