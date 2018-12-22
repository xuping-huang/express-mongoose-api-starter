const { promisify } = require('util');
const debug = require('debug')('apiKit');

const isCriticalError = error => error.isCritical;

const sendMailIfCritical = (error) => {
  if (isCriticalError(error)) {
    // TODO: send mail
    debug('send mail for critical error.');
  }
};

const saveQueueIfCritical = (error) => {
  if (isCriticalError(error)) {
    // TODO: save error log to queue
    debug('save to queue for critical error.');
  }
};

const sendMailToAdminIfCritical = promisify(sendMailIfCritical);
const saveInOpsQueueIfCritical = promisify(saveQueueIfCritical);

exports.handleError = async (error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  await sendMailToAdminIfCritical;
  await saveInOpsQueueIfCritical;
};
