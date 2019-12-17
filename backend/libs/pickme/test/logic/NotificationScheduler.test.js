// Load environment variables
require('dotenv').config();

const Bags = require('../../logic/Bags');
const MongoDbMock = require('../MongoDbMock');
const demoBags = require('../../database/init/bags');
const Database = require('../../database/Database');
const NotificationScheduler = require('../../logic/NotificationScheduler');
const CronJob = require('cron').CronJob;

/** A class which wraps the method to be spied on. */
class CallbackWrapper {
  /** Just a method to be spied on. */
  callback() {/* Do nothing */};
}

const mongoDbMock = new MongoDbMock();
const notificationScheduler = NotificationScheduler.getInstance();
const startCronJobSpy = jest.spyOn(CronJob.prototype, 'start');
const callbackSpy = jest.spyOn(CallbackWrapper.prototype, 'callback');

beforeAll(() => {
  jest.mock('../../database/Database');
  Database.connect = mongoDbMock.getMockConnect().bind(Database);
  notificationScheduler.on('bagIsDue', new CallbackWrapper().callback);
});

beforeEach(async (done) => {
  await Promise.all[demoBags.map(async (bag) => {
    await Bags.addBag(bag);
  })];
  jest.clearAllMocks();
  done();
});

afterEach(async (done) => {
  await mongoDbMock.cleanup();
  done();
});

afterAll(async (done) => {
  await mongoDbMock.stop();
  done();
});


test('Schedule notification', async (done) => {
  // PRE
  const bag = demoBags[0];
  const date = new Date();
  date.setSeconds(date.getSeconds() + 1);
  bag.dueDate = date;

  // ACT
  notificationScheduler.scheduleNotification(bag);

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).toBeCalled();
    done();
  }, 1500);

  expect(startCronJobSpy).toBeCalled();
});

test('Schedule passed notification', async (done) => {
  // PRE
  const bag = demoBags[0];
  const date = new Date();
  date.setSeconds(date.getSeconds() - 1);
  bag.dueDate = date;

  // ACT
  notificationScheduler.scheduleNotification(bag);

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).not.toBeCalled();
    done();
  }, 1500);

  expect(startCronJobSpy).not.toBeCalled();
});

test('Schedule notification for malformed bag', async (done) => {
  // PRE
  const bag = {...demoBags[0]};
  delete bag.name;
  const date = new Date();
  date.setSeconds(date.getSeconds() + 1);
  bag.dueDate = date;

  // ACT
  expect(() => {
    notificationScheduler.scheduleNotification(bag);
  }).toThrow();

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).not.toBeCalled();
    done();
  }, 1500);

  expect(startCronJobSpy).not.toBeCalled();
});

test('Abort scheduled notification implicitly', async (done) => {
  // PRE
  const bag = {...demoBags[0]};
  const date = new Date();
  date.setSeconds(date.getSeconds() + 1);
  bag.dueDate = date;

  // ACT
  notificationScheduler.scheduleNotification(bag);
  delete bag.dueDate;
  // Scheduling a notification for the same bag but without a dueDate should
  // abort the already scheduled notification.
  notificationScheduler.scheduleNotification(bag);

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).not.toBeCalled();
    done();
  }, 1500);

  expect(startCronJobSpy).toBeCalled();
});

test('Schedule same notification twice', async (done) => {
  // PRE
  const bag = {...demoBags[0]};
  const date = new Date();
  date.setSeconds(date.getSeconds() + 1);
  bag.dueDate = date;

  // ACT
  notificationScheduler.scheduleNotification(bag);
  notificationScheduler.scheduleNotification(bag);

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    done();
  }, 1500);

  expect(startCronJobSpy).toHaveBeenCalledTimes(2);
});

test('Abort scheduled notification explicitly', async (done) => {
  // PRE
  const bag = {...demoBags[0]};
  const date = new Date();
  date.setSeconds(date.getSeconds() + 1);
  bag.dueDate = date;
  notificationScheduler.scheduleNotification(bag);
  const stopCronJobSpy = jest.spyOn(CronJob.prototype, 'stop');

  // ACT
  notificationScheduler.abortScheduledNotification(bag._id);

  // CHECK
  setTimeout(() => {
    expect(callbackSpy).not.toBeCalled();
    done();
  }, 1500);

  expect(startCronJobSpy).toBeCalled();
  expect(stopCronJobSpy).toBeCalled();
});

test('Abort non-existent notification explicitly', async (done) => {
  expect(() => {
    notificationScheduler.abortScheduledNotification('sdfsf');
  }).not.toThrow();
  done();
});

test('Initialize', async (done) => {
  // PRE
  const bags = await Bags.getBags();

  const scheduleNotificationSpy = jest
      .spyOn(NotificationScheduler.prototype, 'scheduleNotification')
      .mockImplementationOnce(jest.fn());

  // ACT
  await notificationScheduler.init();

  expect(scheduleNotificationSpy).toBeCalledTimes(2);
  expect(scheduleNotificationSpy).toHaveBeenCalledWith(bags[0]);
  expect(scheduleNotificationSpy).toHaveBeenCalledWith(bags[1]);
  done();
});


