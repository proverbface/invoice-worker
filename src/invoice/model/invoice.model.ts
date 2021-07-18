import {InvoiceStatus} from './invoice-status.model';
import {InvoiceContentLine} from './invoice-content-line.model';

export interface Invoice {
  invoiceId: string;
  invoiceNumber?: string;
  dueDateUtc?: string;
  createdDateUtc?: string;
  updatedDateUtc?: string;
  status?: InvoiceStatus;
  lineItems?: InvoiceContentLine[];
}
