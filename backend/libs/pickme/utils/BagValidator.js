'use strict';

const SecOffset = require('../utils/SecOffset');
const DateValidator = require('../utils/DateValidator');

/**
 * Validates if the given bag is valid.
 * @param {Bag} bag The bag to be validated.
 * @return {string|null} Error-message or null (if everything is fine).
 */
module.exports.validate = (bag) => {
  const dueDate = bag.dueDate;

  // Check if dueDate contains an offset instead of a date.
  if (dueDate && dueDate.match) {
    if (!SecOffset.isValid(dueDate) &&
      !DateValidator.isValidIsoString(dueDate)) {
      return 'Invalid dueDate. DueDate must be specified either as ' +
        'ISO-string or as offset (e.g. \'+10\').';
    }
  }

  if (bag.content && !Array.isArray(bag.content)) {
    return 'Invalid content. Content must be array.';
  }

  // Each bag must have a name.
  if (!bag.name) {
    return 'Bag must have name.';
  }

  if (bag.content && Array.isArray(bag.content)) {
    // Each item must have a name and state.
    const itemIsInvalid = bag.content.some((item) => {
      return item.name === undefined || item.state === undefined;
    });

    if (itemIsInvalid) {
      return 'Each item must have name and state.';
    }
  }

  return null;
};
