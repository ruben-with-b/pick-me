/**
 * Represents a particular bag.
 */
class Bag {
  /**
   * ctor
   * @param {string} name The name of the bag.
   * @param {string} illustration Location of an illustration characterizing
   * the bag.
   */
  constructor(name, illustration) {
    this.name = name;
    this.illustration = illustration;
    this.content = [];
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
