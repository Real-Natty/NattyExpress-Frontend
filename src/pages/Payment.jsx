import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import imageUrl from "../utils/imageUrl";
import "./Payment.css";

function Payment() {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  if (cart.length === 0) {
    return (
      <main className="container payment-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>

          <p>Add products before making a payment.</p>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const handleContinue = () => {
    sessionStorage.setItem(
      "nattyexpress-payment",
      JSON.stringify({
        paymentMethod,
      }),
    );

    navigate("/payment-confirmation");
  };

  return (
    <main className="container payment-page">
      <h1>Payment</h1>

      <div className="payment-layout">
        <div className="payment-card">
          <h2>Choose Payment Method</h2>

          <div className="payment-methods">
            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>
                <strong>Debit / Credit Card</strong>
                <small>Secure payment with your card</small>
              </span>
            </label>

            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>
                <strong>PayPal</strong>
                <small>Pay with your PayPal account</small>
              </span>
            </label>

            <label className="payment-method">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span>
                <strong>Bank Transfer</strong>
                <small>Transfer directly from your bank</small>
              </span>
            </label>
          </div>

          <div className="payment-selected">
            {paymentMethod === "card" && (
              <>
                <h3>Debit / Credit Card</h3>

                <p>
                  You will be securely redirected to our payment provider to
                  enter your card details.
                </p>
              </>
            )}

            {paymentMethod === "paypal" && (
              <>
                <h3>PayPal</h3>

                <p>
                  You will be redirected to PayPal to complete your payment
                  securely.
                </p>
              </>
            )}

            {paymentMethod === "bank" && (
              <>
                <h3>Bank Transfer</h3>

                <p>
                  Your bank transfer instructions will be displayed before your
                  order is confirmed.
                </p>
              </>
            )}

            <button
              type="button"
              className="pay-button"
              onClick={handleContinue}
            >
              Continue to Confirmation
            </button>
          </div>
        </div>

        <div className="payment-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="payment-item" key={item._id}>
              <img src={imageUrl(item.image)} alt={item.name} />

              <div>
                <h3>{item.name}</h3>

                <p>Qty: {item.quantity}</p>

                <strong>
                  ₦{(Number(item.price) * item.quantity).toLocaleString()}
                </strong>
              </div>
            </div>
          ))}

          <hr />

          <div className="payment-total">
            <span>Total</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Payment;
