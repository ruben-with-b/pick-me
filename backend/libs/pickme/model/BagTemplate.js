'use strict';

/**
 * Represents a bag-template.
 */
class BagTemplate {
  /**
   * ctor
   * @param {string} name The name of a bag.
   * @param {string} illustration Location of an illustration characterizing
   * the bag.
   */
  constructor(name, illustration) {
    this.name = name;
    this.illustration = illustration;
  };
}

module.exports = BagTemplate;
