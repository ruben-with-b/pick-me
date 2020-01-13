'use strict';

const Item = require('../model/bag/Item');
const Bag = require('../model/bag/Bag');

// Checks whether a string specifies an offset.
const special = new RegExp('(?<=\\+)\\d+');

/** Enables the creation of valid bag-objects. */
class BagFactory {
  /**
   * Creates bag from any object you assume to be a bag. If the given object
   * is no bag you will get 'undefined'.
   * @param {any} rawBag Something you assume to be a bag.
   * @return {Bag|undefined} Bag or 'undefined'.
   */
  static create(rawBag) {
    let dueDate = rawBag.dueDate;

    // Check if dueDate contains an offset instead of a date.
    if (dueDate && dueDate.match) {
      const matches = rawBag.dueDate.match(special);
      const secOffset = matches ? Number.parseInt(matches[0]) : null;
      if (secOffset) {
        dueDate = new Date();
        dueDate.setSeconds(dueDate.getSeconds() + secOffset);
        dueDate = dueDate.toISOString();
      }
    }

    const bag =
      new Bag(rawBag.name, rawBag.illustration, dueDate, rawBag.byUser);

    if (rawBag.content && !Array.isArray(rawBag.content)) {
      return undefined;
    }

    if (rawBag.content && Array.isArray(rawBag.content)) {
      rawBag.content.forEach((item) => {
        bag.addItem(new Item(item.name, item.state));
      });
    }

    bag._id = rawBag._id;

    // Each bag must have a name.
    if (!bag.name) {
      return undefined;
    }

    // Each item must have a name and state.
    const itemIsInvalid = bag.content.some((item) => {
      return item.name === undefined || item.state === undefined;
    });

    return itemIsInvalid ? undefined : bag;
  };
}

module.exports = BagFactory;
