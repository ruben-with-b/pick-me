const CronJob = require('cron').CronJob;
const Database = require('../database/Database');

/**
 * Sends notifications when a bag is due.
 */
class NotificationScheduler {
  /**
   * Schedules a notification at the due date of the bag.
   * If items are unpacked at the due date, the user is notified.
   * If the bag does not have a due date already scheduled notifications
   * are aborted.
   * @param {Bag} bag The bag for which a notification should be set scheduled.
   */
  static scheduleNotification(bag) {
    const now = new Date();
    const dueDate = bag.dueDate ? new Date(bag.dueDate) : undefined;
    if (!dueDate || dueDate < now) {
      // Abort already scheduled notifications.
      NotificationScheduler.abortScheduledNotification(bag._id);
      return;
    }

    let cronJob = NotificationScheduler.bag2scheduler.get(bag._id);

    if (cronJob && cronJob.cronTime === dueDate) {
      // The notification to be scheduled is already scheduled!
      return;
    }

    // If there is already a notification scheduled, it must be aborted.
    if (cronJob) {
      cronJob.stop();
    }

    // At last we must schedule a (new) notification.
    cronJob = new CronJob(dueDate, () => {
      // TODO Trigger proper notification
      console.log(`Don't forget to pack the remaining items of bag: ` +
        `"${bag.name}"`);
    });
    cronJob.start();
    NotificationScheduler.bag2scheduler.set(bag._id, cronJob);
  }

  /**
   * Aborts the already scheduled notification of the specified bag.
   * @param {string} bagId The id of an existing bag.
   */
  static abortScheduledNotification(bagId) {
    const cronJob = NotificationScheduler.bag2scheduler.get(bagId);
    if (cronJob) {
      cronJob.stop();
      NotificationScheduler.bag2scheduler.delete(bagId);
    }
  }

  /**
   * @return {Promise<void>}
   */
  static async init() {
    const dbClient = await Database.connect();
    try {
      const bags = await dbClient.getBags();
      bags.forEach((bag) => {
        NotificationScheduler.scheduleNotification(bag);
      });
    } finally {
      await dbClient.close();
    }
  }
}

/**
 * Maps a bag-uuid to the cron-job which triggers the due date notification.
 * @type {Map<string, CronJob>}
 */
NotificationScheduler.bag2scheduler = new Map();

module.exports = NotificationScheduler;
