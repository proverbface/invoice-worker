import {handleInvoice} from './invoice.handler';
import {mockInvoices} from './api/mock-invoice-response';
import {InvoiceEvent} from './model/invoice-event.model';
import {InvoiceType} from './model/invoice-type.model';
import {deleteFile, fileExists} from '../commons/file';
import {createInvoice} from '../commons/pdf';

jest.mock('../commons/pdf');
jest.mock('../commons/file');
jest.mock('../commons/logger');

const invoiceStorage = '/dummy/dir';
const invoiceFileName = '/dummy/dir/97f0821d-3517-471a-95f2-f00da84ec56e.pdf';

describe('invoice.handler', () => {
  beforeEach(() => {
    (fileExists as jest.Mock).mockReset();
    (createInvoice as jest.Mock).mockReset();
    (deleteFile as jest.Mock).mockReset();
  });

  it('should handle invoice created when invoice pdf does not exist', async () => {
    const invoice = Object.assign({}, mockInvoices.items[0] as unknown as InvoiceEvent);
    (fileExists as jest.Mock).mockResolvedValue(false);
    await handleInvoice(invoice, invoiceStorage);
    expect(fileExists).toHaveBeenCalledWith(invoiceFileName);
    expect(createInvoice).toHaveBeenCalledWith(invoice, invoiceFileName);
  });
  it('should handle invoice created when invoice pdf exists', async () => {
    const invoice = Object.assign({}, mockInvoices.items[0] as unknown as InvoiceEvent);
    (fileExists as jest.Mock).mockResolvedValue(true);
    await handleInvoice(invoice, invoiceStorage);
    expect(fileExists).toHaveBeenCalledWith(invoiceFileName);
    expect(createInvoice).not.toBeCalled();
  });
  it('should handle invoice updated', async () => {
    const invoice = Object.assign({}, mockInvoices.items[0] as unknown as InvoiceEvent);
    invoice.type = InvoiceType.INVOICE_UPDATED;
    await handleInvoice(invoice, invoiceStorage);
    expect(deleteFile).toHaveBeenCalledWith(invoiceFileName);
    expect(createInvoice).toHaveBeenCalledWith(invoice, invoiceFileName);
  });
  it('should handle invoice deleted', async () => {
    const invoice = Object.assign({}, mockInvoices.items[0] as unknown as InvoiceEvent);
    invoice.type = InvoiceType.INVOICE_DELETED;
    await handleInvoice(invoice, invoiceStorage);
    expect(deleteFile).toHaveBeenCalledWith(invoiceFileName);
  });
});
