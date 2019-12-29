'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Get a user
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Create new user
router.post('/', (req, res) => {
});

// Update user data
router.patch('/:id', (req, res) => {
});

module.exports = router;
