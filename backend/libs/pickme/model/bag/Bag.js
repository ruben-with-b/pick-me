'use strict';

/**
 * Represents a particular bag.
 */
class Bag {
  /**
   * ctor
   * @param {string} name The name of the bag.
   * @param {string} illustration Location of an illustration characterizing
   * the bag.
   * @param {string} dueDate
   * (optional) Time at which the bag must be ready packed. (ISO 8601 format)
   */
  constructor(name, illustration, dueDate) {
    this.name = name;
    this.illustration = illustration;
    this.dueDate = dueDate;
    this.content = [];
    this._id = undefined;
  }

  /**
   * Adds an item to the bag.
   * @param {Item} item
   */
  addItem(item) {
    this.content.push(item);
  }
}

module.exports = Bag;
