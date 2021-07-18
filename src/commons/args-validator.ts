import {Arguments} from 'yargs';
import {
  FEED_URL_ARG_KEY,
  INVALID_FEED_URL_MESSAGE,
  INVALID_INVOICE_DIR_MESSAGE,
  INVALID_PULL_INTERVAL_MESSAGE,
  INVOICE_DIR_ARG_KEY,
  MAX_PULL_INTERVAL,
  MIN_PULL_INTERVAL,
  PULL_INTERVAL_ARG_KEY,
} from '../model/cli.constant';
import {isUrl} from './url';
import {isDirectory} from './file';

export const validateCliArgs = (argv: Arguments): boolean => {
  const feedUrl = argv[FEED_URL_ARG_KEY] as string;
  const invoiceDir = argv[INVOICE_DIR_ARG_KEY] as string;
  const pullInterval = argv[PULL_INTERVAL_ARG_KEY] as number;

  if (!isUrl(feedUrl)) {
    throw new Error(INVALID_FEED_URL_MESSAGE);
  }
  if (!isDirectory(invoiceDir)) {
    throw new Error(INVALID_INVOICE_DIR_MESSAGE);
  }
  if (pullInterval && (pullInterval > MAX_PULL_INTERVAL || pullInterval < MIN_PULL_INTERVAL)) {
    throw new Error(INVALID_PULL_INTERVAL_MESSAGE);
  }
  return true;
};
