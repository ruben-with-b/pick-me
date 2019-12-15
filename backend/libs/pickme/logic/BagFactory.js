const Item = require('../model/bag/Item');
const Bag = require('../model/bag/Bag');

/** Enables the creation of valid bag-objects. */
class BagFactory {
  /**
   * Creates bag from any object you assume to be a bag. If the given object
   * is no bag you will get 'undefined'.
   * @param {any} rawBag Something you assume to be a bag.
   * @return {Bag|undefined} Bag or 'undefined'.
   */
  static create(rawBag) {
    const bag = new Bag(rawBag.name, rawBag.illustration, rawBag.dueDate);

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
