/* eslint-disable no-console,no-constant-condition */ //The console is required for the file since is a command line app
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {
  DEMAND_MESSAGE,
  FEED_URL_ARG_KEY,
  INVOICE_DIR_ARG_KEY,
  PULL_INTERVAL_ARG_KEY,
  DEFAULT_PULL_INTERVAL,
  PULL_INTERVAL_HELP_MESSAGE,
  INVOICE_PATH_HELP_MESSAGE,
  FEED_URL_HELP_MESSAGE,
  COMMAND_HELP_MESSAGE,
  COMMAND,
} from './model/cli.constant';
import schedule from 'node-schedule';
import {handleInvoiceEvent} from './invoice/invoice-event.handler';
import {CliArgs} from './model/cli-args.model';
import {validateCliArgs} from './commons/args-validator';

let job: schedule.Job;

const runPeriodic = (args: CliArgs): void => {
  job = schedule.scheduleJob(`*/${args.pullInterval} * * * *`, async () => {
    await handleInvoiceEvent(args);
  });
};

export const invoiceWorker = yargs(hideBin(process.argv))
  .scriptName('invoice-worker')
  .option(FEED_URL_ARG_KEY, {
    describe: FEED_URL_HELP_MESSAGE,
  })
  .option(INVOICE_DIR_ARG_KEY, {
    describe: INVOICE_PATH_HELP_MESSAGE,
    type: 'string',
  })
  .option(PULL_INTERVAL_ARG_KEY, {
    describe: PULL_INTERVAL_HELP_MESSAGE,
    default: DEFAULT_PULL_INTERVAL,
    type: 'number',
  })
  .demandOption([FEED_URL_ARG_KEY, INVOICE_DIR_ARG_KEY, PULL_INTERVAL_ARG_KEY], DEMAND_MESSAGE)
  .check(validateCliArgs)
  .command(
    COMMAND,
    COMMAND_HELP_MESSAGE,
    (args) => {
      return {
        feedUrl: args.argv[FEED_URL_ARG_KEY] as string,
        invoiceDir: args.argv[INVOICE_DIR_ARG_KEY],
        pullInterval: args.argv[PULL_INTERVAL_ARG_KEY] as number,
      } as CliArgs;
    },
    runPeriodic,
  )
  .fail(() => job?.cancel())
  .demandCommand()
  .showHelpOnFail(false, 'whoops, something went wrong! run with --help')
  .help();

invoiceWorker.argv;
