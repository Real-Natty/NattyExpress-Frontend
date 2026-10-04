import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import imageUrl from "../utils/imageUrl";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [deletingOrder, setDeletingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setMessage(
        error.response?.data?.message || "Failed to load your orders.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const steps = {
      Pending: 1,
      Processing: 2,
      Shipped: 3,
      Delivered: 4,
    };

    return steps[status] || 1;
  };

  const canDeleteOrder = (status) => {
    return status === "Cancelled" || status === "Delivered";
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order from your order history?",
    );

    if (!confirmed) return;

    try {
      setDeletingOrder(orderId);
      setMessage("");

      await api.delete(`/orders/${orderId}`);

      setOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== orderId),
      );
    } catch (error) {
      console.error("Failed to delete order:", error);

      setMessage(
        error.response?.data?.message || "Failed to delete the order.",
      );
    } finally {
      setDeletingOrder(null);
    }
  };

  if (loading) {
    return (
      <main className="container orders-page">
        <h1>My Orders</h1>
        <p>Loading your orders...</p>
      </main>
    );
  }

  return (
    <main className="container orders-page">
      <h1>My Orders</h1>

      {message && <p className="orders-message">{message}</p>}

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>
          <p>You haven't placed any orders yet.</p>

          <Link to="/" className="continue-shopping">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);

            return (
              <div className="order-card" key={order._id}>
                <div className="order-card-header">
                  <div>
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>

                    <p>
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="order-header-right">
                    <span
                      className={`order-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>

                    {canDeleteOrder(order.status) && (
                      <button
                        type="button"
                        className="delete-order-button"
                        onClick={() => handleDeleteOrder(order._id)}
                        disabled={deletingOrder === order._id}
                      >
                        {deletingOrder === order._id
                          ? "Deleting..."
                          : "Delete Order"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Tracking */}
                {order.status !== "Cancelled" && (
                  <div className="order-tracking">
                    <h4>Order Tracking</h4>

                    <div className="tracking-steps">
                      <div
                        className={`tracking-step ${
                          currentStep >= 1 ? "active" : ""
                        }`}
                      >
                        <div className="tracking-circle">1</div>
                        <span>Pending</span>
                      </div>

                      <div
                        className={`tracking-line ${
                          currentStep >= 2 ? "active" : ""
                        }`}
                      ></div>

                      <div
                        className={`tracking-step ${
                          currentStep >= 2 ? "active" : ""
                        }`}
                      >
                        <div className="tracking-circle">2</div>
                        <span>Processing</span>
                      </div>

                      <div
                        className={`tracking-line ${
                          currentStep >= 3 ? "active" : ""
                        }`}
                      ></div>

                      <div
                        className={`tracking-step ${
                          currentStep >= 3 ? "active" : ""
                        }`}
                      >
                        <div className="tracking-circle">3</div>
                        <span>Shipped</span>
                      </div>

                      <div
                        className={`tracking-line ${
                          currentStep >= 4 ? "active" : ""
                        }`}
                      ></div>

                      <div
                        className={`tracking-step ${
                          currentStep >= 4 ? "active" : ""
                        }`}
                      >
                        <div className="tracking-circle">4</div>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                )}

                {order.status === "Cancelled" && (
                  <div className="cancelled-order">
                    This order has been cancelled.
                  </div>
                )}

                <div className="order-items">
                  {order.items.map((item) => (
                    <div
                      className="order-item"
                      key={`${order._id}-${item.product}`}
                    >
                      <img src={imageUrl(item.image)} alt={item.name} />

                      <div>
                        <h4>{item.name}</h4>

                        <p>Quantity: {item.quantity}</p>

                        <strong>
                          ₦
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <span>Total</span>

                  <strong>₦{Number(order.totalAmount).toLocaleString()}</strong>
                </div>

                <div className="order-delivery">
                  <h4>Delivery Information</h4>

                  <p>
                    <strong>Name:</strong> {order.customer.fullName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.customer.address},{" "}
                    {order.customer.city}, {order.customer.state}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MyOrders;
