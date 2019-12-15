const BagFactory = require('../../logic/BagFactory');

const BAG = {
  '_id': '5df4f33475369c3300a65c37',
  'name': 'sports-bag',
  'illustration': '/images/sportsBag.png',
  'content': [
    {
      'name': 'Shoes',
      'state': false,
    },
    {
      'name': 'Shin guards',
      'state': true,
    },
    {
      'name': 'Gloves',
      'state': false,
    },
  ],
  'dueDate': '2019-12-11T11:55:33.380Z',
};

test('Create fully equipped bag.', () => {
  // ACT
  const actual = BagFactory.create(BAG);

  // CHECK
  checkFullyEquippedBag(actual);
});

test('Create bag who only has a name.', () => {
  // PRE
  const bag = JSON.parse(JSON.stringify(BAG));
  delete bag._id;
  delete bag.illustration;
  delete bag.content;
  delete bag.dueDate;

  // ACT
  const actual = BagFactory.create(bag);

  // CHECK
  expect(actual).not.toBeUndefined();
  expect(actual.name).toBe('sports-bag');
  expect(actual.illustration).toBe(undefined);
  expect(actual.dueDate).toBe(undefined);
  expect(Array.isArray(actual.content)).toBe(true);
  expect(actual.content.length).toBe(0);
  expect(actual._id).toBe(undefined);
});

test('Item must have name.', () => {
  // PRE
  const bag = JSON.parse(JSON.stringify(BAG));
  delete bag.content[1].name;

  // ACT
  const actual = BagFactory.create(bag);

  // CHECK
  expect(actual).toBe(undefined);
});

test('Item must have state.', () => {
  // PRE
  const bag = JSON.parse(JSON.stringify(BAG));
  delete bag.content[2].state;

  // ACT
  const actual = BagFactory.create(bag);

  // CHECK
  expect(actual).toBe(undefined);
});

test('Content must be array.', () => {
  // PRE
  const bag = JSON.parse(JSON.stringify(BAG));
  bag.content = 'no array';

  // ACT
  const actual = BagFactory.create(bag);

  // CHECK
  expect(actual).toBe(undefined);
});

test('Remove unnecessary attribute.', () => {
  // PRE
  const bag = {additionalAttribute: 'additional', ...BAG};

  // ACT
  const actual = BagFactory.create(bag);

  // CHECK
  checkFullyEquippedBag(actual);
  expect(actual.additionalAttribute).toBeUndefined();
});

/**
 * Checks whether bag has all expected attributes.
 * @param {Bag} bag The bag to be checked.
 */
function checkFullyEquippedBag(bag) {
  expect(bag).not.toBeUndefined();
  expect(bag.name).toBe('sports-bag');
  expect(bag.illustration).toBe('/images/sportsBag.png');
  expect(bag.dueDate).toBe('2019-12-11T11:55:33.380Z');
  expect(Array.isArray(bag.content)).toBe(true);
  expect(bag.content.length).toBe(3);
  bag.content.forEach((item) => {
    if (!item.name) {
      throw new Error('Item does not have name!');
    }
    if (item.state === undefined) {
      throw new Error('Item does not have state!');
    }
    switch (item.name) {
      case 'Shoes':
        expect(item.state).toBe(false);
        break;
      case 'Shin guards':
        expect(item.state).toBe(true);
        break;
      case 'Gloves':
        expect(item.state).toBe(false);
        break;
      default:
        throw new Error(`Unexpected item: ${item.name}`);
    }
  });
  expect(bag._id).toBe('5df4f33475369c3300a65c37');
}
