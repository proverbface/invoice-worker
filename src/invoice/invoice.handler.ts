import {InvoiceEvent} from './model/invoice-event.model';
import {InvoiceType} from './model/invoice-type.model';
import {deleteFile, fileExists} from '../commons/file';
import {createInvoice} from '../commons/pdf';

export const handleInvoice = async (invoice: InvoiceEvent, storagePath: string): Promise<void | boolean> => {
  const fileName = `${storagePath}/${invoice.content.invoiceId}.pdf`;
  switch (invoice.type) {
    case InvoiceType.INVOICE_CREATED: {
      if (!(await fileExists(fileName))) {
        return createInvoice(invoice, fileName);
      }
      return Promise.resolve();
    }
    case InvoiceType.INVOICE_UPDATED: {
      await deleteFile(fileName);
      return createInvoice(invoice, fileName);
    }
    case InvoiceType.INVOICE_DELETED: {
      return deleteFile(fileName);
    }
  }
};
