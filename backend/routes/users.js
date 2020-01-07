'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Users = require('../libs/pickme/logic/Users');
// const UserCreator = require('../libs/pickme/logic/UserCreator');

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
router.post('/', (req, res) => {
});


module.exports = router;
