import React, { useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import QRCode from 'qrcode.react'; // Import QR Code component
import './OrderPage.css'; 
import Navbar from './Navbar';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, finalAmount, gstAmount, discount, date, time } = location.state || {};
  const [message, setMessage] = useState('');
  const [isOnlinePayment, setIsOnlinePayment] = useState(false); 

  const handlePayment = (method) => {
    if (method === 'cash') {
      setMessage('Your order has been placed successfully! Thank you for choosing Cash on Delivery.');
      setIsOnlinePayment(false); 
    } else {
      setIsOnlinePayment(true); 
    }
  };

 
  const upiId = "HikersCycle07@bank";
  const paymentMessage = `Pay ₹${finalAmount.toFixed(2)} via UPI`;

  return (
    <>
      <Navbar />
      <div className="order-page">
        <h1>Order Confirmation</h1>
        <h2>Order Date: {date}</h2>
        <h2>Order Time: {time}</h2>
        {cartItems && cartItems.length > 0 ? (
          <div>
            <h2>Your Order Details:</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="order-item">
                <h3>{item.title}</h3>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p>Subtotal: ₹{finalAmount.toFixed(2)}</p>
              <p>GST: ₹{gstAmount.toFixed(2)}</p>
              <p>Discount: ₹{discount.toFixed(2)}</p>
              <p><strong>Total: ₹{finalAmount.toFixed(2)}</strong></p>
            </div>

            <div className="payment-options">
              <h2>Select Payment Method:</h2>
              <button onClick={() => handlePayment('cash')}>Cash on Delivery</button>
              <button onClick={() => handlePayment('online')}>Online Payment</button>
            </div>

            {isOnlinePayment && ( 
              <div className="upi-container">
                <h3>Scan the QR Code to pay:</h3>
                <QRCode value={upiId} size={256} />
                <p>Or pay via UPI ID: {upiId}</p>
                <p>{paymentMessage}</p>
              </div>
            )}
          </div>
        ) : (
          <h3>No Order Details Available</h3>
        )}
        {message && <div className="confirmation-message">{message}</div>}
      </div>
    </>
  );
};

export default OrderPage;
