import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom'; 
import './CartPage.css';
import Navbar from './Navbar';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  const gstAmount = totalAmount * 0.18;
  const discount = cartItems.reduce((total, item) => total + ((item.price || 0) * ((item.offer || 0) / 100)) * (item.quantity || 0), 0);
  const finalAmount = totalAmount + gstAmount - discount;

  const handlePayment = () => {
    const orderDetails = {
      cartItems,
      finalAmount,
      gstAmount,
      discount,
      date: new Date().toLocaleDateString(), 
      time: new Date().toLocaleTimeString() 
    };
    navigate('/OrderPage', { state: orderDetails }); 
  };

  return (
    <>
      <Navbar /> 
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <h3 className="cart-empty">Cart is empty</h3>
        ) : (
          <div className="cart-container">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-description">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                  <p className="price">₹{item.price}</p>
                  <div className="quantity">
                    <label>Quantity: </label>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </div>
                  <p className="gst">GST: ₹{((item.price || 0) * (item.quantity || 0) * 0.18).toFixed(2)}</p>
                  <p className="offer">Offer: {item.offer || 0}%</p>
                  <div className='Cartbtn'>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-total">
            <div className="total-card">
              <h2>Price Details</h2>
              <div className="price-row">
                <h3>Subtotal:</h3>
                <h3>₹{totalAmount.toFixed(2)}</h3>
              </div>
              <div className="price-row">
                <h3>GST (18%):</h3>
                <h3>₹{gstAmount.toFixed(2)}</h3>
              </div>
              <div className="price-row">
                <h3>Discount:</h3>
                <h3>₹{discount.toFixed(2)}</h3>
              </div>
              <div className="price-row">
                <h3>Total Amount:</h3>
                <h3>₹{finalAmount.toFixed(2)}</h3>
              </div>
              <div className='Pay'>
                <button onClick={handlePayment}>Order</button> 
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
