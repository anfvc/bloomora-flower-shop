import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const downloadInvoice = (selectedInvoice) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  const addCenteredText = (text, y) => {
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  let yOffset = 25;

  doc.setFontSize(12);

  addCenteredText("Invoice Details", yOffset);
  yOffset += 10;

  doc.text(`Business Name: ${selectedInvoice.businessName}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Business Contact: ${selectedInvoice.businessContact}`, 10, yOffset);
  yOffset += 20;
  doc.text(`Customer Name: ${selectedInvoice.customerName}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Customer Contact: ${selectedInvoice.customerContact}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Invoice Number: ${selectedInvoice.invoiceNumber}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Issue Date: ${selectedInvoice.issueDate}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Due Date: ${selectedInvoice.dueDate}`, 10, yOffset);
  yOffset += 10;

  yOffset += 10;

  doc.autoTable({
    startY: yOffset,
    head: [["Description", "Quantity", "Unit Price", "Total Price"]],
    body: selectedInvoice.items.map((item) => [
      item.description,
      item.quantity,
      `${item.unitPrice} €`,
      `${item.totalPrice} €`,
    ]),
  });

  yOffset = doc.lastAutoTable.finalY + 10;

  doc.text(`Delivery Fee: ${selectedInvoice.deliveryFee} €`, 10, yOffset);
  yOffset += 10;
  doc.text(`Setup Fee: ${selectedInvoice.setupFee} €`, 10, yOffset);
  yOffset += 10;
  doc.text(`Discount: -${selectedInvoice.discount} €`, 10, yOffset);
  yOffset += 10;
  doc.text(`Subtotal: ${selectedInvoice.subtotal} €`, 10, yOffset);
  yOffset += 10;
  doc.text(`Tax: ${selectedInvoice.tax} €`, 10, yOffset);
  yOffset += 10;
  doc.text(`Total: ${selectedInvoice.total} €`, 10, yOffset);
  yOffset += 10;

  yOffset += 10;

  doc.text(`Payment Terms: ${selectedInvoice.paymentTerms}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Payment Methods: ${selectedInvoice.paymentMethods}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Notes: ${selectedInvoice.notes}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Privacy Policy: ${selectedInvoice.privacyPolicy}`, 10, yOffset);
  yOffset += 10;
  doc.text(`Refund Policy: ${selectedInvoice.refundPolicy}`, 10, yOffset);

  doc.save("invoice.pdf");
};
