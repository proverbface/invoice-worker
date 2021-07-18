import express from 'express';
import {mockInvoiceFeedUpdate, mockInvoices} from './invoice/api/mock-invoice-response';
import chalk from 'chalk';

// Used for testing automation of invoice worker

const app = express();

let dummyCount = 0;

app.get('/invoices', (req, res) => {
  if (dummyCount == 0) {
    dummyCount++;
    res.send(mockInvoices);
  } else {
    res.send(mockInvoiceFeedUpdate);
    dummyCount = 0;
  }
});

app.listen(2000, () => console.info(chalk.blue('Test server started on port 2000')));
