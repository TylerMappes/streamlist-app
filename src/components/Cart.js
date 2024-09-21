import React, { useState, useEffect } from 'react'; // Import necessary hooks
import './Cart.css'; // Import CSS for styling

// Functional component for the "Cart" page
const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State for storing cart items

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart)); // Parse and set the stored cart items
    }
  }, []);

  // Save the cart items to local storage whenever the cart items state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handler for removing an item from the cart
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index); // Remove the item at the specified index
    setCartItems(updatedCart); // Update the cart state
  };

  // Handler for updating the quantity of an item
  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity; // Update the quantity for the specific item
    setCartItems(updatedCart); // Update the cart state
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2> {/* Page Title */}
      
      {cartItems.length === 0 ? ( 
        <p>Your cart is empty.</p> // Show a message if the cart is empty
      ) : (
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="item-name">{item.name}</span> {/* Item name */}
              <span className="item-price">${item.price}</span> {/* Item price */}
              
              {/* Quantity input field */}
              <input 
                type="number" 
                value={item.quantity} 
                min="1" 
                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                className="quantity-input"
              />

              {/* Button to remove item from cart */}
              <button 
                onClick={() => handleRemoveItem(index)} 
                className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart; // Export component to be used in the app
