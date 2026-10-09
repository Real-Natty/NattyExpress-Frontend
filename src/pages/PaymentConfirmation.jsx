import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import imageUrl from "../utils/imageUrl";
import api from "../api/axios";
import "./PaymentConfirmation.css";

function PaymentConfirmation() {
  const { user, loading: authLoading } = useAuth();
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkoutData = JSON.parse(
    sessionStorage.getItem("nattyexpress-checkout") || "null",
  );

  const paymentData = JSON.parse(
    sessionStorage.getItem("nattyexpress-payment") || "null",
  );
  if (authLoading) {
    return <main className="container">Checking your account...</main>;
  }

  if (!user) {
    return (
      <main className="container payment-confirmation-page">
        <h1>Login Required</h1>
        <p>Please log in or create an account before placing an order.</p>

        <button
          onClick={() =>
            navigate("/login", {
              state: { from: "/checkout" },
            })
          }
        >
          Login to Continue
        </button>

        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </main>
    );
  }

  if (cart.length === 0 || !checkoutData || !paymentData) {
    return (
      <main className="container payment-confirmation-page">
        <div className="empty-cart">
          <h1>Payment Session Expired</h1>

          <p>Please return to checkout and try again.</p>

          <Link to="/cart" className="continue-shopping">
            Return to Cart
          </Link>
        </div>
      </main>
    );
  }

  const paymentMethodNames = {
    card: "Debit / Credit Card",
    paypal: "PayPal",
    bank: "Bank Transfer",
  };

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/payments/initialize", {
        customer: checkoutData,
        paymentMethod: paymentData.paymentMethod,
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      });

      const { authorization_url, reference } = response.data;

      if (!authorization_url) {
        throw new Error("Paystack payment link was not created.");
      }

      sessionStorage.setItem("nattyexpress-payment-reference", reference);

      window.location.href = authorization_url;
    } catch (error) {
      console.error("Payment initialization error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment. Please try again.",
      );

      setLoading(false);
    }
  };

  return (
    <main className="container payment-confirmation-page">
      <h1>Confirm Your Order</h1>

      <div className="confirmation-layout">
        <div className="confirmation-main">
          <section className="confirmation-card">
            <h2>Delivery Information</h2>

            <div className="customer-info">
              <p>
                <strong>Name:</strong> {checkoutData.fullName}
              </p>

              <p>
                <strong>Phone:</strong> {checkoutData.phone}
              </p>

              <p>
                <strong>Email:</strong> {checkoutData.email}
              </p>

              <p>
                <strong>Address:</strong> {checkoutData.address}
              </p>

              <p>
                <strong>City:</strong> {checkoutData.city}
              </p>

              <p>
                <strong>State:</strong> {checkoutData.state}
              </p>
            </div>

            <button
              className="edit-details-button"
              onClick={() => navigate("/checkout")}
            >
              Edit Delivery Details
            </button>
          </section>

          <section className="confirmation-card">
            <h2>Payment Method</h2>

            <div className="selected-payment">
              <strong>{paymentMethodNames[paymentData.paymentMethod]}</strong>

              <span>
                {paymentData.paymentMethod === "card" &&
                  "Secure Paystack payment"}

                {paymentData.paymentMethod === "paypal" && "PayPal payment"}

                {paymentData.paymentMethod === "bank" && "Bank transfer"}
              </span>
            </div>

            <button
              className="edit-details-button"
              onClick={() => navigate("/payment")}
              disabled={loading}
            >
              Change Payment Method
            </button>
          </section>

          <section className="confirmation-card">
            <h2>Your Items</h2>

            {cart.map((item) => (
              <div className="confirmation-item" key={item._id}>
                <img src={imageUrl(item.image)} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>

                  <p>Quantity: {item.quantity}</p>

                  <strong>
                    ₦{(Number(item.price) * item.quantity).toLocaleString()}
                  </strong>
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="confirmation-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Items</span>

            <strong>{cart.length}</strong>
          </div>

          <div className="summary-line">
            <span>Subtotal</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>

            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div className="confirmation-total">
            <span>Total</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>

          {error && <p className="payment-error">{error}</p>}

          <button
            className="confirm-payment-button"
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            {loading
              ? "Connecting to Paystack..."
              : `Confirm & Pay ₦${cartTotal.toLocaleString()}`}
          </button>

          <p className="secure-payment">
            You will be redirected to Paystack to complete your payment
            securely.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default PaymentConfirmation;
