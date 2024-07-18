import React, { useState } from "react";
import Modal from "react-modal";
import "./Invoice.css";
import { IoIosArrowForward } from "react-icons/io";
import image1 from "../../images/invoice-images/image1.jpg";
import { downloadInvoice } from "../invoiceDownload/InvoiceDownload";

Modal.setAppElement("#root");

function Invoice() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedInvoice(null);
  };

  const invoiceDetails = {
    businessName: "Bloomora Flowers",
    businessContact:
      "123 Flower St, Blossom City, FL 12345\nPhone: (123) 456-7890\nEmail: contact@bloomora.com\nWebsite: www.bloomora.com",
    customerName: "Jane Doe",
    customerContact: "456 Petal Ln, Floral Town, FL 67890",
    invoiceNumber: "INV-001234",
    issueDate: "2024-07-18",
    dueDate: "2024-08-01",
    items: [
      {
        description: "Rose Bouquet",
        quantity: 2,
        unitPrice: 25,
        totalPrice: 50,
      },
      {
        description: "Wedding Floral Arrangement",
        quantity: 1,
        unitPrice: 200,
        totalPrice: 200,
      },
    ],
    deliveryFee: 15,
    setupFee: 30,
    discount: 10,
    subtotal: 265,
    tax: 21.2,
    total: 291.2,
    paymentTerms:
      "Payment due within 15 days. Late fee of 5% applies after due date.",
    paymentMethods: "Credit Card, Bank Transfer, PayPal",
    notes: "Thank you for choosing Bloomora Flowers for your special event!",
    privacyPolicy:
      "Your privacy is important to us. We do not share your information with third parties.",
    refundPolicy: "Full refund within 7 days for non-custom orders.",
  };

  return (
    <div className="invoiceContainer">
      {[...Array(4)].map((_, index) => (
        <div
          className="invoiceBox"
          key={index}
          onClick={() => openModal(invoiceDetails)}
        >
          <div className="invoicePrice">
            <p>50 €</p>
          </div>
          <div className="invoiceProduct">
            <img src={image1} alt="" />
            <div>
              <h2>still open</h2>
              <p>seller: bloomora</p>
              <p>Rose</p>
            </div>
          </div>
          <IoIosArrowForward />
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="customInvoiceModal"
        overlayClassName="customOverlay"
        contentLabel="Invoice Details Modal"
      >
        {selectedInvoice && (
          <div className="modalContent">
            <h2>Invoice Details</h2>
            <div className="invoiceHeader">
              <div className="businessInfo">
                <h3>{selectedInvoice.businessName}</h3>
                <p>{selectedInvoice.businessContact}</p>
              </div>
              <div className="invoiceInfo">
                <p>
                  <strong>Invoice #: </strong>
                  {selectedInvoice.invoiceNumber}
                </p>
                <p>
                  <strong>Date of Issue: </strong>
                  {selectedInvoice.issueDate}
                </p>
                <p>
                  <strong>Due Date: </strong>
                  {selectedInvoice.dueDate}
                </p>
              </div>
            </div>
            <div className="customerInfo">
              <p>
                <strong>Billed To: </strong>
                {selectedInvoice.customerName}
              </p>
              <p>{selectedInvoice.customerContact}</p>
            </div>
            <div className="itemList">
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitPrice} €</td>
                      <td>{item.totalPrice} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="additionalCharges">
              <p>
                <strong>Delivery Fee: </strong>
                {selectedInvoice.deliveryFee} €
              </p>
              <p>
                <strong>Setup Fee: </strong>
                {selectedInvoice.setupFee} €
              </p>
              <p>
                <strong>Discount: </strong>-{selectedInvoice.discount} €
              </p>
            </div>
            <div className="summary">
              <p>
                <strong>Subtotal: </strong>
                {selectedInvoice.subtotal} €
              </p>
              <p>
                <strong>Tax: </strong>
                {selectedInvoice.tax} €
              </p>
              <p>
                <strong>Total: </strong>
                {selectedInvoice.total} €
              </p>
            </div>
            <div className="paymentTerms">
              <p>{selectedInvoice.paymentTerms}</p>
              <p>
                <strong>Payment Methods: </strong>
                {selectedInvoice.paymentMethods}
              </p>
            </div>
            <div className="notes">
              <p>
                <strong>Notes: </strong>
                {selectedInvoice.notes}
              </p>
              <p>
                <strong>Privacy Policy: </strong>
                {selectedInvoice.privacyPolicy}
              </p>
              <p>
                <strong>Refund Policy: </strong>
                {selectedInvoice.refundPolicy}
              </p>
            </div>
            <div className="invoiceModalClose">
              <button onClick={closeModal}>Close</button>
              <button onClick={() => downloadInvoice(selectedInvoice)}>Download</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Invoice;
