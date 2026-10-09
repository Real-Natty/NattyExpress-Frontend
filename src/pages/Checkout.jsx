import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import imageUrl from "../utils/imageUrl";

function Checkout() {
  const { cart, cartTotal } = useCart();
  const { user, loading } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    if (user) {
      setFormData((current) => ({
        ...current,
        fullName: current.fullName || user.name || "",
        email: current.email || user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Save the customer's delivery information
  //   // temporarily so the payment page can use it.
  //   sessionStorage.setItem("nattyexpress-checkout", JSON.stringify(formData));

  //   // Continue to payment
  //   navigate("/payment");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!user) {
      navigate("/login", {
        state: { from: "/checkout" },
      });

      return;
    }

    sessionStorage.setItem("nattyexpress-checkout", JSON.stringify(formData));

    navigate("/payment");
  };
  if (loading) {
    return (
      <main className="container checkout-page">
        <p>Checking your login status...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container checkout-page">
        <div className="checkout-form-card">
          <h1>Login Required</h1>

          <p>Please log in or create an account before placing an order.</p>

          <button
            type="button"
            onClick={() =>
              navigate("/login", {
                state: { from: "/checkout" },
              })
            }
          >
            Login to Continue
          </button>

          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </main>
    );
  }
  if (cart.length === 0) {
    return (
      <main className="container checkout-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>

          <p>Add some products before checking out.</p>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-form-card">
          <h2>Delivery Information</h2>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="08012345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Delivery Address</label>

            <textarea
              name="address"
              placeholder="Enter your full delivery address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="e.g. Uyo"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <label>State</label>

            <input
              type="text"
              name="state"
              placeholder="e.g. Akwa Ibom"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <button type="submit">Continue to Payment</button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-item" key={item._id}>
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

          <div className="checkout-total">
            <span>Total</span>

            <strong>₦{cartTotal.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
