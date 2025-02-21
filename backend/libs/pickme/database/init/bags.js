'use strict';

/** Some demo bags. */
const Bag = require('../../model/bag/Bag');
const Item = require('../../model/bag/Item');

const universityBag =
  new Bag('university-bag', '/images/backpack.png', null, null);
universityBag.addItem(new Item('Laptop', false));
universityBag.addItem(new Item('Pencil', true));
universityBag.addItem(new Item('rubber', true));

const soccerBag = new Bag('soccer-bag', '/images/sportsBag.png', null, null);
soccerBag.addItem(new Item('Shoes', false));
soccerBag.addItem(new Item('Shin guards', false));
soccerBag.addItem(new Item('Gloves', false));

/** Some bag templates... */
module.exports = [
  universityBag,
  soccerBag,
];
