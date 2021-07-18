import * as fs from 'fs';
import PDFDocument from 'pdfkit';
import {InvoiceEvent} from '../invoice/model/invoice-event.model';
import {Invoice} from '../invoice/model/invoice.model';
import moment from 'moment';
import {InvoiceStatus} from '../invoice/model/invoice-status.model';

export const createInvoice = (invoice: InvoiceEvent, path: string): Promise<void> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({size: 'A4', margin: 50});

    generateInvoiceHeader(doc, invoice.content);
    generateInvoiceTable(doc, invoice.content);

    if (invoice.content.dueDateUtc) {
      generateFooter(doc, moment(invoice.content.dueDateUtc).format('DD/MM/YYYY'));
    }

    doc.end();
    doc.pipe(fs.createWriteStream(path));
    resolve();
  });
};

export const generateInvoiceHeader = (doc: PDFKit.PDFDocument, invoiceContent: Invoice): void => {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

  generateHr(doc, 185);

  const invoiceHeaderTop = 200;

  const subtotal = invoiceContent.lineItems?.map((item) => item.lineItemTotalCost).reduce((acc, item) => acc + item);

  const lineHeight = 15;
  const invoiceStatusY = invoiceHeaderTop + lineHeight;
  const invoiceDateY = invoiceHeaderTop + lineHeight * 2;
  const dueDateY = invoiceHeaderTop + lineHeight * 3;
  const balanceDueY = invoiceHeaderTop + lineHeight * 4;

  const invoiceDate = invoiceContent.createdDateUtc ? moment(invoiceContent.createdDateUtc).format('DD/MM/YYYY') : '-';
  const invoiceStatus = invoiceContent?.status?.toString() ?? InvoiceStatus.DRAFT.toString();
  const invoiceDueDate = invoiceContent.dueDateUtc ? moment(invoiceContent.dueDateUtc).format('DD/MM/YYYY') : '-';
  const invoiceNumber = invoiceContent.invoiceNumber ?? invoiceContent.invoiceId;

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, invoiceHeaderTop)
    .font('Helvetica-Bold')
    .text(invoiceNumber, 150, invoiceHeaderTop)
    .font('Helvetica')
    .text('Invoice Status:', 50, invoiceStatusY)
    .text(invoiceStatus, 150, invoiceStatusY)
    .text('Invoice Date:', 50, invoiceDateY)
    .text(invoiceDate, 150, invoiceDateY)
    .text('Due Date:', 50, dueDateY)
    .text(invoiceDueDate, 150, dueDateY)
    .text('Balance Due:', 50, balanceDueY)
    .text(formatCurrency(subtotal), 150, balanceDueY)
    .moveDown();

  generateHr(doc, 282);
};

export const generateInvoiceTable = (doc: PDFKit.PDFDocument, content: Invoice): void => {
  const invoiceTableTop = 300;

  doc.font('Helvetica-Bold');
  generateTableRow(doc, invoiceTableTop, 'Description', 'Unit Cost', 'Quantity', 'Line Total');
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  let position = invoiceTableTop;

  for (let x = 0; x < content.lineItems.length; x++) {
    const item = content.lineItems[x];
    position = position + 30;

    if (position > 680) {
      doc.addPage();
      position = 50;
    }

    const lineCost = item.lineItemTotalCost ? formatCurrency(item.lineItemTotalCost) : formatCurrency(item.unitCost * item.quantity);
    generateTableRow(doc, position, item.description, formatCurrency(item.unitCost), item.quantity?.toFixed(0), lineCost);
    generateHr(doc, position + 20);
  }

  const subtotalPosition = position + 30;
  const subtotal = content.lineItems?.map((item) => item.lineItemTotalCost).reduce((acc, item) => acc + item);

  generateTableRow(doc, subtotalPosition, '', 'Subtotal', '', formatCurrency(subtotal));

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(doc, paidToDatePosition, '', 'Paid To Date', '', formatCurrency(0));

  const duePosition = paidToDatePosition + 25;
  doc.font('Helvetica-Bold');
  generateTableRow(doc, duePosition, '', 'Total', '', formatCurrency(subtotal));
  doc.font('Helvetica');
};

export const generateFooter = (doc: PDFKit.PDFDocument, date: string): PDFKit.PDFDocument =>
  doc.fontSize(10).text(`Payment is due on ${date}. Thank you for your business.`, 50, 780, {align: 'center', width: 500});

export const generateTableRow = (doc: PDFKit.PDFDocument, y: number, description = '', unitCost = '', quantity = '', lineTotal = ''): PDFKit.PDFDocument => {
  const unitOptions = {width: 90, align: 'right'};
  return doc
    .fontSize(10)
    .text(description, 50, y)
    .text(unitCost, 280, y, unitOptions)
    .text(quantity, 370, y, unitOptions)
    .text(lineTotal, 0, y, {align: 'right'});
};

export const generateHr = (doc: PDFKit.PDFDocument, y: number): PDFKit.PDFDocument =>
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();

export const formatCurrency = (amount: number): string => `$${amount ? amount.toFixed(2) : 0}`;
