'use strict';

const CronJob = require('cron').CronJob;
const Database = require('../database/Database');
const {EventEmitter} = require('events');
const BagFactory = require('../logic/BagFactory');

/**
 * Sends notifications when a bag is due.
 */
class NotificationScheduler extends EventEmitter {
  /** ctor */
  constructor() {
    super();
    /**
     * Maps a bag-uuid to the cron-job which triggers the due date notification.
     * @type {Map<string, CronJob>}
     */
    this.bag2scheduler = new Map();
  }
  /**
   * Schedules a notification at the due date of the bag.
   * If items are unpacked at the due date, the user is notified.
   * If the bag does not have a due date already scheduled notifications
   * are aborted.
   * @param {Bag} rawBag The bag for which a notification should be set
   * scheduled.
   */
  scheduleNotification(rawBag) {
    const bag = BagFactory.create(rawBag);
    if (!bag) {
      throw new Error(`Bag is malformed bag: ${rawBag}`);
    }

    const now = new Date();
    const dueDate = bag.dueDate ? new Date(bag.dueDate) : undefined;
    if (!dueDate || dueDate < now) {
      // Abort already scheduled notifications.
      this.abortScheduledNotification(bag._id);
      return;
    }

    let cronJob = this.bag2scheduler.get(bag._id);

    // Due to the fact that there is no convenient solution to get the CronTime
    // we cannot check, if the dueDate has changed. As a workaround we stop
    // the maybe existing CronJob. After that we reschedule the job. (Even if
    // the CronTime has not changed!)

    // If there is already a notification scheduled, it must be aborted.
    if (cronJob) {
      cronJob.stop();
    }

    // At last we must schedule a (new) notification.
    cronJob = new CronJob(dueDate, () => {
      const msg = `Don't forget to pack the remaining items of bag: ` +
        `"${bag.name}"`;
      this.emit(EVENT_BAG_DUE, msg);
    });
    cronJob.start();
    this.bag2scheduler.set(bag._id, cronJob);
  }

  /**
   * Aborts the already scheduled notification of the specified bag.
   * @param {string} bagId The id of an existing bag.
   */
  abortScheduledNotification(bagId) {
    const cronJob = this.bag2scheduler.get(bagId);
    if (cronJob) {
      cronJob.stop();
      this.bag2scheduler.delete(bagId);
    }
  }

  /**
   * @return {Promise<void>}
   */
  async init() {
    const dbClient = await Database.connect();
    try {
      const bags = await dbClient.getBags();
      bags.forEach((bag) => {
        this.scheduleNotification(bag);
      });
    } finally {
      await dbClient.close();
    }
  }
}

/**
 * @return {NotificationScheduler} The NotificationScheduler instance.
 */
function getInstance() {
  return NotificationScheduler.instance;
}

const EVENT_BAG_DUE = 'bagIsDue';

NotificationScheduler.instance = new NotificationScheduler();

module.exports = NotificationScheduler;
module.exports.getInstance = getInstance;
module.exports.EVENT_BAG_DUE = EVENT_BAG_DUE;
