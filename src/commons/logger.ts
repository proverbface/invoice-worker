import log4js from 'log4js';

export const logger = log4js.getLogger();
logger.level = 'all';
log4js.configure({
  appenders: {worker: {type: 'file', filename: 'worker.log'}},
  categories: {default: {appenders: ['worker'], level: 'all'}},
});
