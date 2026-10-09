import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import api from "../api/axios";
// import imageUrl from "../utils/imageUrl";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const { cart, clearCart } = useCart();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const reference =
    searchParams.get("reference") ||
    sessionStorage.getItem("nattyexpress-payment-reference");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", {
        replace: true,
        state: { from: "/payment-success" },
      });
      return;
    }

    let cancelled = false;

    const verifyPayment = async () => {
      try {
        if (!reference) {
          throw new Error("Payment reference was not found.");
        }

        const checkoutData = JSON.parse(
          sessionStorage.getItem("nattyexpress-checkout") || "null",
        );

        const paymentData = JSON.parse(
          sessionStorage.getItem("nattyexpress-payment") || "null",
        );

        if (!checkoutData || !paymentData) {
          throw new Error(
            "Checkout information is missing. Please contact support if your payment was deducted.",
          );
        }

        if (!cart || cart.length === 0) {
          throw new Error(
            "Your cart information is missing. Please contact support if your payment was deducted.",
          );
        }

        const response = await api.post(
          `/payments/verify/${encodeURIComponent(reference)}`,
          {
            customer: checkoutData,
            paymentMethod: paymentData.paymentMethod,
            items: cart.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
          },
        );

        if (cancelled) return;

        setOrder(response.data.order);

        clearCart();

        sessionStorage.removeItem("nattyexpress-checkout");
        sessionStorage.removeItem("nattyexpress-payment");
        sessionStorage.removeItem("nattyexpress-payment-reference");
      } catch (error) {
        if (cancelled) return;

        console.error("Payment verification error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "We could not verify your payment.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, reference, cart, clearCart, navigate]);

  if (loading) {
    return (
      <main className="container payment-success-page">
        <div className="success-card">
          <div className="success-icon">...</div>

          <h1>Confirming Your Payment</h1>

          <p className="success-message">
            Please wait while we verify your payment and place your order.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container payment-success-page">
        <div className="success-card">
          <div className="success-icon">!</div>

          <h1>Payment Verification Failed</h1>

          <p className="success-message">{error}</p>

          <div className="success-actions">
            <Link to="/orders" className="view-orders-button">
              View My Orders
            </Link>

            <Link to="/" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container payment-success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Your payment has been verified and your order has been placed
          successfully.
        </p>

        <div className="order-number">
          <span>Order Number</span>

          <strong>
            {order?._id ? `NE-${order._id.slice(-8).toUpperCase()}` : "N/A"}
          </strong>
        </div>

        <div className="success-details">
          <div>
            <span>Amount Paid</span>

            <strong>₦{Number(order?.totalAmount || 0).toLocaleString()}</strong>
          </div>

          <div>
            <span>Payment Status</span>

            <strong className="paid">Paid</strong>
          </div>

          <div>
            <span>Order Status</span>

            <strong>{order?.status || "Processing"}</strong>
          </div>
        </div>

        <p className="delivery-message">
          We will process your order and keep you updated as it moves from
          processing to shipped and delivered.
        </p>

        <div className="success-actions">
          <Link to="/orders" className="view-orders-button">
            View My Orders
          </Link>

          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PaymentSuccess;
