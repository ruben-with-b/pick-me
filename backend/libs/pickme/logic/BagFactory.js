'use strict';

const Item = require('../model/bag/Item');
const Bag = require('../model/bag/Bag');
const SecOffset = require('../utils/SecOffset');
const BagValidator = require('../utils/BagValidator');

/** Enables the creation of valid bag-objects. */
class BagFactory {
  /**
   * Creates bag from any object you assume to be a bag. If the given object
   * is no bag you will get 'undefined'.
   * @param {any} rawBag Something you assume to be a bag.
   * @return {Bag|undefined} Bag or 'undefined'.
   */
  static create(rawBag) {
    const error = BagValidator.validate(rawBag);
    if (error) {
      return undefined;
    }

    let dueDate = rawBag.dueDate;

    // Check if dueDate contains an offset instead of a date.
    if (dueDate && dueDate.match) {
      if (SecOffset.isValid(dueDate)) { // If it is invalid it is supposed to
        // be an ISO-string.
        const secOffset = SecOffset.getOffset(dueDate);
        if (secOffset) {
          dueDate = new Date();
          dueDate.setSeconds(dueDate.getSeconds() + secOffset);
          dueDate = dueDate.toISOString();
        }
      }
    }

    const bag =
      new Bag(rawBag.name, rawBag.illustration, dueDate, rawBag.byUser);

    if (rawBag.content && Array.isArray(rawBag.content)) {
      rawBag.content.forEach((item) => {
        bag.addItem(new Item(item.name, item.state));
      });
    }

    bag._id = rawBag._id;

    return bag;
  };
}

module.exports = BagFactory;
