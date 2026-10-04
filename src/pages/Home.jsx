import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const searchTerm = searchParams.get("search") || "";

  const setSearchTerm = (value) => {
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setMessage("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // const filteredProducts = products.filter((product) => {
  //   const search = searchTerm.toLowerCase().trim();

  //   if (!search) {
  //     return true;
  //   }
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  //   return (
  //     product.name.toLowerCase().includes(search) ||
  //     product.category.toLowerCase().includes(search) ||
  //     product.description.toLowerCase().includes(search)
  //   );
  // });

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} added to cart.`);
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const lowStockProducts = products.filter((product) => product.stock <= 5);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Welcome to NattyExpress</h1>
          <p>Shop quality gadgets and electronics at great prices.</p>

          <Link to="/" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="container products-section">
        <div className="products-header">
          <div>
            <h2>Gadgets</h2>
            <p>Find the gadgets you need.</p>
          </div>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="home-search">
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button onClick={() => setSearchTerm("")}>Clear</button>
            )}
          </div>
        </div>

        {message && <p className="cart-message">{message}</p>}

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try searching for another gadget or category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image-wrapper">
                  <Link to={`/products/${product._id}`}>
                    <img src={imageUrl(product.image)} alt={product.name} />
                  </Link>

                  <button
                    type="button"
                    className={`wishlist-button ${
                      isInWishlist(product._id) ? "active" : ""
                    }`}
                    onClick={() => handleWishlist(product)}
                    aria-label={
                      isInWishlist(product._id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isInWishlist(product._id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-card-content">
                  <span className="product-category">{product.category}</span>

                  <Link to={`/products/${product._id}`}>
                    <h3>{product.name}</h3>
                  </Link>

                  <p className="product-description">{product.description}</p>

                  <div className="product-card-bottom">
                    <strong>₦{Number(product.price).toLocaleString()}</strong>

                    <button
                      className="product-add-to-cart-button"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
