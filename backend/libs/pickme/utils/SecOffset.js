'use strict';

// Checks whether a string specifies an offset.
const validatorRegEx = new RegExp('^\\+\\d+$');
// Extracts the offset from a string.
const extractorRegEx = new RegExp('(?<=\\+)\\d+');

module.exports = class SecOffset {
  /**
   * Checks whether or not the given input-string is a valid offset-string.
   * @param {string} input To be validated.
   * @return {boolean}
   */
  static isValid(input) {
    if (input && input.match) {
      return !!input.match(validatorRegEx);
    }
    return false;
  }

  /**
   * Extracts the offset from the given string.
   * @param {string} input String containing offset.
   * @return {Promise<null|number>} The offset.
   */
  static getOffset(input) {
    if (!SecOffset.isValid(input)) {
      return null;
    }

    const matches = input.match(extractorRegEx);
    return matches ? Number.parseInt(matches[0]) : null;
  }
};
