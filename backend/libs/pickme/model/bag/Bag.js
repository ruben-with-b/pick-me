const Item = require('./Item');

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

/**
 * Creates bag from any object you assume to be a bag. If the given object
 * is no bag you will get 'undefined'.
 * @param {any} rawBag Something you assume to be a bag.
 * @return {Bag|undefined} Bag or 'undefined'.
 */
const create = function(rawBag) {
  const bag = new Bag(rawBag.name, rawBag.illustration, rawBag.dueDate);
  if (rawBag.content && Array.isArray(rawBag.content)) {
    rawBag.content.forEach((item) => {
      bag.addItem(new Item(item.name, item.state));
    });
  }

  bag._id = rawBag._id;

  if (!bag.name) {
    return undefined;
  }

  bag.content.forEach((item) => {
    if (!item.name || !item.state) {
      return undefined;
    }
  });

  return bag;
};

module.exports = Bag;
module.exports.create = create;
