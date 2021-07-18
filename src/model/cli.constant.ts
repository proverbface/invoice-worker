// Arguments
export const FEED_URL_ARG_KEY = 'feed-url';
export const INVOICE_DIR_ARG_KEY = 'invoice-dir';
export const PULL_INTERVAL_ARG_KEY = 'pull-interval';
export const COMMAND = 'run';
// Invalid messages
export const DEMAND_MESSAGE = `Please provide both --${FEED_URL_ARG_KEY} and --${INVOICE_DIR_ARG_KEY} arguments to work with this tool.`;
export const INVALID_FEED_URL_MESSAGE = `Invalid --${FEED_URL_ARG_KEY}. Please use a valid url.`;
export const INVALID_INVOICE_DIR_MESSAGE = `Invalid --${INVOICE_DIR_ARG_KEY}. Please use valid directory.`;
export const INVALID_PULL_INTERVAL_MESSAGE = `Invalid --${PULL_INTERVAL_ARG_KEY}. Max 60 minutes. Min 1 minute.`;
//Help
export const FEED_URL_HELP_MESSAGE = 'Provide a url where you wish to fetch the invoices feed';
export const INVOICE_PATH_HELP_MESSAGE = 'Provide the directory path where you wish to save the generated invoices';
export const PULL_INTERVAL_HELP_MESSAGE = 'Provide the desired pull interval in seconds. Max 60 minutes. Min 1 minute.';
export const COMMAND_HELP_MESSAGE = 'Run this program';
// Defaults, Max, Min
export const DEFAULT_PULL_INTERVAL = 1; // 1 minute
export const MAX_PULL_INTERVAL = 60; // 60 minutes
export const MIN_PULL_INTERVAL = 1; // 1 minute
