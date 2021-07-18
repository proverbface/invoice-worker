import {handleInvoiceEvent} from './invoice-event.handler';
import {getInvoiceEvents} from './api/invoice-event.api';
import {mockInvoices} from './api/mock-invoice-response';
import {handleInvoice} from './invoice.handler';
import chalk from 'chalk';

jest.mock('./invoice.handler');
jest.mock('./api/invoice-event.api');

const feedUrl = 'http://mydummyurl.com';
const invoiceDir = '/dummy/dir';

describe('invoice-event.handler', () => {
  beforeEach(() => {
    (getInvoiceEvents as jest.Mock).mockReset();
    (handleInvoice as jest.Mock).mockReset();
  });

  it('should fetch and generate invoices', async () => {
    (getInvoiceEvents as jest.Mock).mockResolvedValueOnce(mockInvoices);
    jest.spyOn(global.console, 'log');

    await handleInvoiceEvent({
      feedUrl,
      pullInterval: 20,
      invoiceDir,
    });
    expect(console.log).toHaveBeenLastCalledWith(chalk.yellow('Fetching http://mydummyurl.com every 20 minute/s and will save on /dummy/dir'));
    expect(getInvoiceEvents).toHaveBeenCalledWith(feedUrl);
    expect(handleInvoice).toHaveBeenCalledTimes(3);
    expect(handleInvoice).nthCalledWith(1, mockInvoices.items[0], invoiceDir);
    expect(handleInvoice).nthCalledWith(2, mockInvoices.items[1], invoiceDir);
  });
  it('should handle unexpected errors', async () => {
    (getInvoiceEvents as jest.Mock).mockRejectedValue(new Error('Invalid url'));
    jest.spyOn(global.console, 'log');
    jest.spyOn(global.console, 'error');

    await handleInvoiceEvent({
      feedUrl,
      pullInterval: 20,
      invoiceDir,
    });
    expect(console.log).toHaveBeenLastCalledWith(chalk.yellow('Fetching http://mydummyurl.com every 20 minute/s and will save on /dummy/dir'));
    expect(getInvoiceEvents).toHaveBeenCalledWith(feedUrl);
    expect(handleInvoice).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenLastCalledWith(chalk.red('Invalid url'));
  });
});
