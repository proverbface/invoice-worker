# Invoices Worker

## Getting Started
1. `yarn install`
2. `yarn start --feed-url="feed url" --invoice-dir="dir path"`
3. Check out your newly generated invoices on that dir!

By default, the worker runs on a 20 seconds interval.

### Pulling interval is customizable
It can run on every second as min and every 60 seconds as max.

`yarn start --feed-url="feed url" --invoice-dir="dir path" --pull-interval=45`


### a. Overview of your design
- Used `yargs` (https://www.npmjs.com/package/yargs) to create CLI application
- Used `Axios` for networking
- Used `pdfkit` for PDF generation
- Used `node-schedule` for scheduling pulling job

Basically we use `yargs` to receive the running arguments and provide a nice command line interface.
We schedule a job on the desired interval `(default 1 minute)`, then we check whether we have new events, and if so, we proceed to consume them and act according to the invoice event type. If the there no new events that run completes.

- `cli.ts` -> The command line client
- `commons` folder -> contains utility methods for File, PDF and Validation
- `invoice-event.api` -> contains the networking code
- `invoice-event.handler` -> this is the job executed in an interval. It pulls the data and acts when neccessary.
- `invoice.handler` -> handles what do with each event type

### b. Assumptions you made
- id in InvoiceEvent is sequential and unique

### c. Shortcuts/Compromises made
- last event id from each time we pull data from the invoice event API is stored in memory. 
This could be replaced by a table in a db so that we can persist this in case the application goes down.

### d. How you would improve on this design
- Since the whole implementation is around invoice events, maybe we should consider making `--feed-url` optional and having a default url
- We could store the last processed event id in storage
- Implement scripts so that this client app can be run in Windows, Linux, MacOS in a simpler manner
- For larger event volume we should consider using child processes to speed up invoice event processing
- Instead of pulling on a fixed interval we could connect to a messaging queue directly and listen for new events
- More unit tests
- Default running interval could be increased - say run every 5 minutes
