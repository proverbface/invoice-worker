/* eslint-disable no-console */ //The console is required for the file since is a command line app
import chalk from 'chalk';
import {logger} from '../commons/logger';
import {getInvoiceEvents} from './api/invoice-event.api';
import {CliArgs} from '../model/cli-args.model';
import {handleInvoice} from './invoice.handler';

let lastEventId = -1; //Store last event id in memory

export const handleInvoiceEvent = async (args: CliArgs): Promise<void> => {
  try {
    const log = `Fetching ${args.feedUrl} every ${args.pullInterval} minute/s and will save on ${args.invoiceDir}`;
    console.log(chalk.yellow(log));
    logger.info(log);

    const invoices = await getInvoiceEvents(args.feedUrl);
    const currentLastEventId = invoices.items[invoices.items.length - 1].id;
    if (currentLastEventId > lastEventId) {
      const promises = [];
      invoices.items.forEach((invoice) => promises.push(handleInvoice(invoice, args.invoiceDir)));
      await Promise.all(promises);
      lastEventId = currentLastEventId;
    }
  } catch (error) {
    logger.error(error);
    console.error(chalk.red(error.message));
  }
};
