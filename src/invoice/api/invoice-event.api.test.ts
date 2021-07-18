import axios from 'axios';
import {mockInvoices} from './mock-invoice-response';
import {getInvoiceEvents} from './invoice-event.api';

jest.mock('axios');

describe('invoice-event.api', () => {
  it('should return data successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: mockInvoices});
    expect(await getInvoiceEvents('mydummyurl')).toStrictEqual(mockInvoices);
  });
  it('should return empty data successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: null});
    expect(await getInvoiceEvents('mydummyurl')).toStrictEqual({items: []});
  });
  it('should return an error', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Invalid request 400'));
    try {
      await getInvoiceEvents('mydummyurl');
    } catch (error) {
      expect(error).toStrictEqual(new Error('Invalid request 400'));
    }
  });
});
