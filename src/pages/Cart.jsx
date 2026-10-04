import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import imageUrl from "../utils/imageUrl";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartMessage,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart is Empty</h1>

          <p>You have not added any products to your cart yet.</p>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>

        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {cartMessage && <div className="cart-stock-message">{cartMessage}</div>}
      <div className="cart-layout">
        {/* CART ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={imageUrl(item.image)} alt={item.name} />

              <div className="cart-item-info">
                <h2>{item.name}</h2>

                <p>{item.category}</p>

                <strong>₦{Number(item.price).toLocaleString()}</strong>

                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-cart-item"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>

              <strong className="cart-item-total">
                ₦{(Number(item.price) * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <strong>{cart.length}</strong>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
