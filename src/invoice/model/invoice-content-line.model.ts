export interface InvoiceContentLine {
  lineItemId: string;
  description: string;
  quantity: number;
  unitCost: number;
  lineItemTotalCost: number;
}
