import {InvoiceType} from './invoice-type.model';
import {Invoice} from './invoice.model';

export type InvoiceEvent = {
  id: number;
  type: InvoiceType;
  content: Invoice;
  createdDateUtc: string;
};
