'use strict';

/**
 * An item to be packed into a bag.
 */
class Item {
  /**
   * ctor
   * @param {string} name The name of the item.
   * @param {boolean} state Describes whether the item is packed or not.
   */
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /**
   * Toggles the state of the item.
   */
  toggleState() {
    this.state = !this.state;
  }
}

module.exports = Item;
