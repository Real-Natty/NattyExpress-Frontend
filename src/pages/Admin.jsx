import { useEffect, useState } from "react";
import api from "../api/axios";
import imageUrl from "../utils/imageUrl";

function Admin() {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("All");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + Number(order.totalAmount), 0);

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => product.stock > 0,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    stock: "",
    featured: false,
  });

  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const response = await api.get(`/orders?t=${Date.now()}`);

      console.log("ADMIN ORDERS:", response.data);

      const sortedOrders = [...response.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      if (!editingProductId && !imageFile) {
        setMessage("Please select a product image.");
        return;
      }

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category", formData.category);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("featured", formData.featured);

      if (imageFile) {
        productData.append("image", imageFile);
      }

      if (editingProductId) {
        await api.put(`/admin/products/${editingProductId}`, productData);

        setMessage("Product updated successfully.");
      } else {
        await api.post("/admin/products", productData);

        setMessage("Product added successfully.");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Product save error:", error);

      setMessage(error.response?.data?.message || "Failed to save product.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      stock: "",
      featured: false,
    });

    setImageFile(null);
    setImagePreview("");
    setEditingProductId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.image,
      stock: product.stock,
      featured: product.featured,
    });

    setEditingProductId(product._id);
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateStock = async (product, change) => {
    const newStock = Number(product.stock) + change;

    if (newStock < 0) {
      return;
    }

    try {
      await api.put(`/admin/products/${product._id}`, {
        ...product,
        stock: newStock,
      });

      setProducts((currentProducts) =>
        currentProducts.map((item) =>
          item._id === product._id
            ? {
                ...item,
                stock: newStock,
              }
            : item,
        ),
      );

      setMessage(`${product.name} stock updated.`);
    } catch (error) {
      console.error("Stock update error:", error);

      setMessage(error.response?.data?.message || "Failed to update stock.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/products/${id}`);

      setMessage("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      setMessage(error.response?.data?.message || "Failed to delete product.");
    }
  };

  const toggleFeatured = async (product) => {
    try {
      await api.put(`/admin/products/${product._id}`, {
        ...product,
        featured: !product.featured,
      });

      fetchProducts();
    } catch (error) {
      console.error("Featured update error:", error);

      setMessage(
        error.response?.data?.message || "Failed to update featured status.",
      );
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, {
        status,
      });

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: response.data.order.status,
              }
            : order,
        ),
      );

      setMessage("Order status updated successfully.");
    } catch (error) {
      console.error("Order status update error:", error);

      setMessage(
        error.response?.data?.message || "Failed to update order status.",
      );
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/orders/${orderId}`);

      setOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== orderId),
      );

      setMessage("Order deleted successfully.");
    } catch (error) {
      console.error("Delete order error:", error);

      setMessage(error.response?.data?.message || "Failed to delete order.");
    }
  };

  const productCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const search = productSearch.toLowerCase().trim();

    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      productCategory === "All" || product.category === productCategory;

    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter((product) => product.stock <= 5);

  return (
    <main className="container admin-page">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Sales</span>
          <strong>₦{totalSales.toLocaleString()}</strong>
          <small>All non-cancelled orders</small>
        </div>

        <div className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{totalOrders}</strong>
          <small>All customer orders</small>
        </div>

        <div className="admin-stat-card">
          <span>Pending Orders</span>
          <strong>{pendingOrders}</strong>
          <small>Awaiting processing</small>
        </div>

        <div className="admin-stat-card">
          <span>Processing</span>
          <strong>{processingOrders}</strong>
          <small>Currently being prepared</small>
        </div>

        <div className="admin-stat-card">
          <span>Shipped</span>
          <strong>{shippedOrders}</strong>
          <small>Orders on the way</small>
        </div>

        <div className="admin-stat-card">
          <span>Delivered</span>
          <strong>{deliveredOrders}</strong>
          <small>Successfully delivered</small>
        </div>

        <div className="admin-stat-card">
          <span>Total Products</span>
          <strong>{totalProducts}</strong>
          <small>Products in catalogue</small>
        </div>

        <div className="admin-stat-card">
          <span>In Stock</span>
          <strong>{inStockProducts}</strong>
          <small>Products available</small>
        </div>

        <div className="admin-stat-card">
          <span>Low Stock</span>
          <strong>{lowStockCount}</strong>
          <small>5 or fewer remaining</small>
        </div>

        <div className="admin-stat-card">
          <span>Out of Stock</span>
          <strong>{outOfStockProducts}</strong>
          <small>Needs restocking</small>
        </div>

        <div className="admin-stat-card">
          <span>Cancelled</span>
          <strong>{cancelledOrders}</strong>
          <small>Cancelled orders</small>
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <section className="low-stock-section">
          <div className="section-heading">
            <div>
              <p>INVENTORY ALERT</p>
              <h2>Low Stock Products</h2>
            </div>

            <span className="low-stock-count">
              {lowStockProducts.length} product
              {lowStockProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="low-stock-list">
            {lowStockProducts.map((product) => (
              <div className="low-stock-item" key={product._id}>
                <img src={imageUrl(product.image)} alt={product.name} />

                <div className="low-stock-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>

                  <strong>
                    {product.stock === 0
                      ? "Out of Stock"
                      : `${product.stock} left in stock`}
                  </strong>
                </div>

                <button type="button" onClick={() => updateStock(product, 1)}>
                  +1 Stock
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="admin-card">
        <h1>{editingProductId ? "Edit Product" : "Add New Product"}</h1>

        <p className="admin-subtitle">Manage your NattyExpress products</p>

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            placeholder="e.g. iPhone 15 Pro"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Product description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            placeholder="e.g. Phones"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label>Price</label>

          <input
            type="number"
            name="price"
            placeholder="e.g. 500000"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label>Product Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingProductId}
          />

          {imageFile && (
            <p className="selected-image">Selected: {imageFile.name}</p>
          )}

          {imagePreview && (
            <div className="image-preview">
              <p>Image Preview</p>
              <img src={imagePreview} alt="Product preview" />
            </div>
          )}

          {editingProductId && !imageFile && formData.image && (
            <p className="selected-image">
              Current image will be kept unless you select a new one.
            </p>
          )}

          <label>Stock</label>

          <input
            type="number"
            name="stock"
            placeholder="e.g. 10"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Product
          </label>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-submit-button">
              {editingProductId ? "Update Product" : "Add Product"}
            </button>

            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="cancel-button"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </div>

      {/* PRODUCTS */}
      <section className="admin-products">
        <div className="admin-products-header">
          <div>
            <h2>Products</h2>
            <p>Manage your NattyExpress inventory</p>
          </div>

          <div className="admin-product-filters">
            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />

            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products match your search.</p>
        ) : (
          <div className="admin-products-list">
            {filteredProducts.map((product) => (
              <div className="admin-product" key={product._id}>
                <img src={imageUrl(product.image)} alt={product.name} />

                <div className="admin-product-info">
                  <h3>{product.name}</h3>

                  <p>{product.category}</p>

                  <strong>₦{Number(product.price).toLocaleString()}</strong>

                  <div className="admin-stock-control">
                    <span>Stock</span>

                    <button
                      type="button"
                      onClick={() => updateStock(product, -1)}
                      disabled={product.stock <= 0}
                    >
                      −
                    </button>

                    <strong>{product.stock}</strong>

                    <button
                      type="button"
                      onClick={() => updateStock(product, 1)}
                    >
                      +
                    </button>
                  </div>

                  {product.stock === 0 ? (
                    <span className="stock-status out">Out of Stock</span>
                  ) : product.stock <= 5 ? (
                    <span className="stock-status low">Low Stock</span>
                  ) : (
                    <span className="stock-status available">In Stock</span>
                  )}

                  {product.featured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>

                <div className="admin-product-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="featured-button"
                    onClick={() => toggleFeatured(product)}
                  >
                    {product.featured ? "UnFeature" : "Feature"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ORDERS */}
      <section className="admin-orders">
        <div className="section-heading">
          <div>
            <p>ORDER MANAGEMENT</p>
            <h2>Customer Orders</h2>
          </div>

          <button className="view-all" onClick={fetchOrders}>
            Refresh Orders
          </button>
        </div>

        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No customer orders yet.</p>
        ) : (
          <div className="admin-orders-list">
            {orders.map((order) => (
              <div className="admin-order" key={order._id}>
                <div className="admin-order-header">
                  <div>
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>

                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="admin-order-actions">
                    <div className="admin-order-status-control">
                      <span
                        className={`admin-order-status-badge ${order.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="delete-order-button"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete Order
                    </button>
                  </div>
                </div>

                <div className="admin-order-customer">
                  <h4>Customer Information</h4>

                  <p>
                    <strong>Name:</strong> {order.customer.fullName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.customer.phone}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.customer.email}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.customer.address},{" "}
                    {order.customer.city}, {order.customer.state}
                  </p>
                </div>

                {/* PAYMENT INFORMATION */}
                <div className="admin-order-payment">
                  <h4>Payment Information</h4>

                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={`payment-status ${order.paymentStatus
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </p>

                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.paymentMethod === "card"
                      ? "Card"
                      : order.paymentMethod === "paypal"
                        ? "PayPal"
                        : order.paymentMethod === "bank"
                          ? "Bank Transfer"
                          : order.paymentMethod || "Not specified"}
                  </p>

                  {order.paymentReference && (
                    <p>
                      <strong>Payment Reference:</strong>{" "}
                      {order.paymentReference}
                    </p>
                  )}
                </div>

                <div className="admin-order-items">
                  <h4>Items Ordered</h4>

                  {order.items.map((item, index) => (
                    <div
                      className="admin-order-item"
                      key={`${order._id}-${index}`}
                    >
                      <img src={imageUrl(item.image)} alt={item.name} />

                      <div>
                        <h4>{item.name}</h4>

                        <p>Quantity: {item.quantity}</p>

                        <strong>
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="admin-order-total">
                  <span>Order Total</span>

                  <strong>₦{Number(order.totalAmount).toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Admin;
