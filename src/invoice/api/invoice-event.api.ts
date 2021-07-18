import axios from 'axios';
import {InvoiceEventList} from '../model/invoice-event-list.model';
import {logger} from '../../commons/logger';

export const getInvoiceEvents = async (url: string): Promise<InvoiceEventList> => {
  try {
    const response = await axios.get<InvoiceEventList>(url);
    return response?.data ?? {items: []};
  } catch (error) {
    logger.error(`Could not fetch invoices from ${url}`, error);
    throw new Error(error.message);
  }
};
