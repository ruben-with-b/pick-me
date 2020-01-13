'use strict';

// Checks whether a string specifies a date.
const validatorRegEx =
  new RegExp('^(\\d\\d)?\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$');

/**
 * Validates if the given date-string is iso-formatted.
 * @param {string} dateString The date-string to be validated.
 * @return {boolean} Is the given date-string is iso-formatted?
 */
module.exports.isValidIsoString = (dateString) => {
  if (dateString && dateString.match) {
    return !!dateString.match(validatorRegEx);
  }
  return false;
};
