'use strict';

/**
 * Enables sharing bags at whatsapp.
 */
class WhatsAppMsgBuilder {
  /**
   * Builds an WhatsApp custom url, which opens WhatsApp and creates a
   * message with a text representation of the current bag.
   * @param {Bag} bag The bag which should be shared.
   * @return {string} Text representation of the bag.
   */
  static buildMsg(bag) {
    let msg = 'whatsapp://send?text=';
    msg += `*Das habe ich bereits in '${bag.name}' ` +
      `eingepackt:*` + `${UNICODE_LINEBREAK}`;
    bag.content.forEach((item) => {
      if (item.state) {
        msg += `${UNICODE_CHECKED_BOX}`;
      } else {
        msg += `${UNICODE_UNCHECKED_BOX}`;
      }
      msg += `${UNICODE_SPACE}${item.name}${UNICODE_LINEBREAK}`;
    });
    return msg.replace(new RegExp('\\s', 'g'), UNICODE_SPACE);
  }
}

const UNICODE_CHECKED_BOX = '%E2%98%91';
const UNICODE_UNCHECKED_BOX = '%E2%97%BB';
const UNICODE_SPACE = '%20';
const UNICODE_LINEBREAK = '%0A';

module.exports = WhatsAppMsgBuilder;
