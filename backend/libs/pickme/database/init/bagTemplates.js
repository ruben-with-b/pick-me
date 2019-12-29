'use strict';

/** Some demo bag-templates. */
const BagTemplates = require('../../model/BagTemplate');

/** Some bag templates... */
module.exports = [
  new BagTemplates('backpack', '/images/backpack.png'),
  new BagTemplates('sports bag', '/images/sportsBag.png'),
  new BagTemplates('baggage', '/images/baggage.png'),
  new BagTemplates('suitcase', '/images/suitcase.png'),
  new BagTemplates('shopping bag', '/images/shoppingBag.png'),
  new BagTemplates('jute bag', '/images/juteBag.png'),
  new BagTemplates('handbag', '/images/handbag.png'),
  new BagTemplates('briefcase', '/images/briefcase.png'),

];
