import {formatCurrency, generateFooter, generateHr, generateTableRow} from './pdf';
import PDFDocument from 'pdfkit';

const generateSpy = (doc: PDFKit.PDFDocument) => {
  jest.spyOn(doc, 'strokeColor');
  jest.spyOn(doc, 'lineWidth');
  jest.spyOn(doc, 'moveTo');
  jest.spyOn(doc, 'lineTo');
  jest.spyOn(doc, 'stroke');
  jest.spyOn(doc, 'fontSize');
  jest.spyOn(doc, 'text');
  jest.spyOn(doc, 'font');
  jest.spyOn(doc, 'fillColor');
};

describe('pdf', () => {
  it('should generate footer', () => {
    const doc = new PDFDocument({size: 'A4', margin: 50});
    generateSpy(doc);
    generateFooter(doc, '10/10/2021');
    doc.end();
    expect(doc.fontSize).toHaveBeenCalledWith(10);
    expect(doc.text).toHaveBeenCalledWith('Payment is due on 10/10/2021. Thank you for your business.', 50, 780, {align: 'center', width: 500});
  });

  it('should generate table row', () => {
    const doc = new PDFDocument({size: 'A4', margin: 50});
    generateSpy(doc);
    generateTableRow(doc, 100, 'item', '10', '2', '20');
    doc.end();
    expect(doc.fontSize).toHaveBeenCalledWith(10);
    expect(doc.text).toHaveBeenCalledWith('item', 50, 100);
    expect(doc.text).toHaveBeenCalledWith('10', 280, 100, {width: 90, align: 'right'});
    expect(doc.text).toHaveBeenCalledWith('2', 370, 100, {width: 90, align: 'right'});
    expect(doc.text).toHaveBeenCalledWith('20', 0, 100, {align: 'right'});
  });

  it('should generate Hr line', () => {
    const doc = new PDFDocument({size: 'A4', margin: 50});
    generateSpy(doc);
    expect(generateHr(doc, 100)).toBeTruthy();
    doc.end();
    expect(doc.strokeColor).toHaveBeenCalledWith('#aaaaaa');
    expect(doc.lineWidth).toHaveBeenCalledWith(1);
    expect(doc.moveTo).toHaveBeenCalledWith(50, 100);
    expect(doc.lineTo).toHaveBeenCalledWith(550, 100);
    expect(doc.stroke).toHaveBeenCalled();
  });

  describe('formatCurrency', () => {
    it('should format currency', () => {
      expect(formatCurrency(null)).toBe('$0');
      expect(formatCurrency(10)).toBe('$10.00');
    });
  });
});
