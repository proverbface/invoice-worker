import {validateCliArgs} from './args-validator';
import {INVALID_FEED_URL_MESSAGE, INVALID_INVOICE_DIR_MESSAGE, INVALID_PULL_INTERVAL_MESSAGE} from '../model/cli.constant';
import {CliArgs} from '../model/cli-args.model';
import {Arguments} from 'yargs';
import mock from 'mock-fs';

const getArgs = (args: CliArgs) => {
  return {
    'feed-url': args.feedUrl,
    'invoice-dir': args.invoiceDir,
    'pull-interval': args.pullInterval,
  } as unknown as Arguments;
};

describe('client arguments validator', () => {
  it('should return invalid url error when receives invalid url', () => {
    expect(() => validateCliArgs(getArgs({feedUrl: '', invoiceDir: '', pullInterval: 0}))).toThrow(new Error(INVALID_FEED_URL_MESSAGE));
    expect(() => validateCliArgs(getArgs({feedUrl: null, invoiceDir: '', pullInterval: 0}))).toThrow(new Error(INVALID_FEED_URL_MESSAGE));
    expect(() => validateCliArgs(getArgs({feedUrl: '125125:22', invoiceDir: '', pullInterval: 0}))).toThrow(new Error(INVALID_FEED_URL_MESSAGE));
  });
  it('should return invalid invoice directory error when receives invalid directory', () => {
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: '', pullInterval: 0}))).toThrow(new Error(INVALID_INVOICE_DIR_MESSAGE));
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: undefined, pullInterval: 0}))).toThrow(
      new Error(INVALID_INVOICE_DIR_MESSAGE),
    );
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: 'dummyDirt', pullInterval: 0}))).toThrow(
      new Error(INVALID_INVOICE_DIR_MESSAGE),
    );
    mock({
      '/dummy/dir/somefile': 'file content',
    });
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: '/dummy/dir/somefile', pullInterval: 0}))).toThrow(
      new Error(INVALID_INVOICE_DIR_MESSAGE),
    );
    mock.restore();
  });
  it('should return invalid pull interval when is invalid', () => {
    mock({
      '/dummy/dir': {},
    });
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: '/dummy/dir', pullInterval: -1}))).toThrow(
      new Error(INVALID_PULL_INTERVAL_MESSAGE),
    );
    expect(() => validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: '/dummy/dir', pullInterval: 61}))).toThrow(
      new Error(INVALID_PULL_INTERVAL_MESSAGE),
    );
    mock.restore();
  });

  it('should return true when all arguments are valid', () => {
    mock({
      '/dummy/dir': {},
    });
    expect(validateCliArgs(getArgs({feedUrl: 'http://myurl.com', invoiceDir: '/dummy/dir', pullInterval: 20}))).toBeTruthy();
    mock.restore();
  });
});
