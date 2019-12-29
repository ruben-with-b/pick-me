'use strict';

// Load environment variables
require('dotenv').config();

const Bags = require('../../logic/Bags');
const MongoDbMock = require('../MongoDbMock');
const demoBags = require('../../database/init/bags');
const Database = require('../../database/Database');
const Bag = require('../../model/bag/Bag');
const Item = require('../../model/bag/Item');
const NotificationScheduler = require('../../logic/NotificationScheduler');

const mongoDbMock = new MongoDbMock();

beforeAll(() => {
  jest.mock('../../database/Database');
  Database.connect = mongoDbMock.getMockConnect().bind(Database);
});

beforeEach(async (done) => {
  demoBags.map(async (bag) => {
    await Bags.addBag(bag);
  });
  done();
});

afterEach(async (done) => {
  await mongoDbMock.cleanup();
  jest.clearAllMocks();
  done();
});

afterAll(async (done) => {
  await mongoDbMock.stop();
  done();
});


test('Add/get bags', async (done) => {
  // ACT
  const actualBags = await Bags.getBags();

  const bagsWithoutId = actualBags.map((bag) => {
    const clone = {...bag};
    delete clone._id;
    return clone;
  });

  // CHECK
  expect(bagsWithoutId.length).toBe(2);
  expect(bagsWithoutId).toEqual(demoBags);

  actualBags.forEach((bag) => {
    expect(bag._id).toBeDefined();
  });
  done();
});

test('Update bag', async (done) => {
  // PRE
  const bags = await Bags.getBags();
  const bag = bags[0];
  const additionalItem = new Item('one more item', false);
  bag.addItem(additionalItem);

  const scheduleNotification =
    jest.spyOn(NotificationScheduler.prototype, 'scheduleNotification');

  // ACT
  const returnValueUpdate = await Bags.updateBag(bag);
  const returnValueGet = await Bags.getBag(bag._id);

  // CHECK
  expect(returnValueUpdate).toEqual(bag);
  expect(returnValueGet).toEqual(bag);
  expect(scheduleNotification).toHaveBeenCalledWith(bag);
  done();
});

test('Update malformed bag', async (done) => {
  // PRE
  const malFormedBag = new Bag(undefined, 'illustration', undefined);

  const scheduleNotification =
    jest.spyOn(NotificationScheduler.prototype, 'scheduleNotification');

  // ACT
  await expect(Bags.updateBag(malFormedBag)).rejects.toThrow();

  // CHECK
  expect(scheduleNotification).not.toHaveBeenCalled();
  done();
});

test('Add bag', async (done) => {
  // PRE
  const additionalBag = new Bag('additional bag', null, null);
  additionalBag.addItem(new Item('item-name', true));

  const scheduleNotification =
    jest.spyOn(NotificationScheduler.prototype, 'scheduleNotification');

  // ACT
  const newBag = await Bags.addBag(additionalBag);

  // CHECK
  const newBagWithoutId = {...newBag};
  delete newBagWithoutId._id;
  expect(newBagWithoutId).toEqual(additionalBag);
  expect(newBag._id).toBeDefined();

  expect(scheduleNotification).toHaveBeenCalledWith(newBag);

  const allBags = await Bags.getBags();
  expect(allBags).toContainEqual(newBag);
  done();
});

test('Add malformed bag', async (done) => {
  // PRE
  const malFormedBag = new Bag(undefined, 'illustration', undefined);

  // ACT
  await expect(Bags.addBag(malFormedBag)).rejects.toThrow();

  // CHECK
  const allBags = await Bags.getBags();
  expect(allBags.length).toBe(2);
  done();
});

test('Delete bag', async (done) => {
  // PRE
  const toBeDeleted = (await Bags.getBags())[0];

  const abortScheduledNotification =
    jest.spyOn(NotificationScheduler.prototype, 'abortScheduledNotification');

  // ACT
  const hasBeenDeleted = await Bags.deleteBag(toBeDeleted._id);

  // CHECK
  expect(hasBeenDeleted).toBe(true);

  const returnValueGet = await Bags.getBag(toBeDeleted._id);
  expect(returnValueGet).not.toBeDefined();

  expect(abortScheduledNotification).toHaveBeenCalledWith(toBeDeleted._id);

  const allBags = await Bags.getBags();
  expect(allBags).not.toContainEqual(toBeDeleted);
  expect(allBags.length).toBe(1);
  done();
});

test('Pass invalid ObjectId to delete', async (done) => {
  // PRE
  const abortScheduledNotification =
    jest.spyOn(NotificationScheduler.prototype, 'abortScheduledNotification');

  // ACT
  await expect(Bags.deleteBag('klsjdfkj')).rejects.toThrow();

  // CHECK
  expect(abortScheduledNotification).not.toHaveBeenCalled();

  const allBags = await Bags.getBags();
  expect(allBags.length).toBe(2);
  done();
});

test('Delete non-existent bag', async (done) => {
  // PRE
  const toBeDeleted = (await Bags.getBags())[0];
  await Bags.deleteBag(toBeDeleted._id);
  jest.clearAllMocks();

  const abortScheduledNotification =
    jest.spyOn(NotificationScheduler.prototype, 'abortScheduledNotification');

  // ACT
  const actualResult = await Bags.deleteBag(toBeDeleted._id);

  // CHECK
  expect(actualResult).toBe(false);

  expect(abortScheduledNotification).not.toHaveBeenCalled();

  const allBags = await Bags.getBags();
  expect(allBags.length).toBe(1);
  done();
});

test('Get bag', async (done) => {
  // PRE
  const bag = (await Bags.getBags())[0];

  // ACT
  const actualResult = await Bags.getBag(bag._id);

  // CHECK
  expect(actualResult).toEqual(bag);
  done();
});

test('Pass invalid ObjectId to get', async (done) => {
  // ACT
  await expect(Bags.getBag('sdf')).rejects.toThrow();

  done();
});

test('Get non-existent bag', async (done) => {
  // PRE
  const bag = (await Bags.getBags())[0];
  await Bags.deleteBag(bag._id);

  // ACT
  const actualResult = await Bags.getBag(bag._id);

  // CHECK
  expect(actualResult).not.toBeDefined();
  done();
});
