const Bag = require('../../model/bag/Bag');
const Item = require('../../model/bag/Item');

const universityBag = new Bag('university', '/images/backpack.png');
universityBag.addItem(new Item('Laptop', false));
universityBag.addItem(new Item('Pencil', true));
universityBag.addItem(new Item('rubber', true));

const soccerBag = new Bag('soccer', '/images/sportsBag.png');
soccerBag.addItem(new Item('Shoes', false));
soccerBag.addItem(new Item('Shin guards', false));
soccerBag.addItem(new Item('Gloves', false));

/** Some bag templates... */
module.exports = [
  universityBag,
  soccerBag,
];
