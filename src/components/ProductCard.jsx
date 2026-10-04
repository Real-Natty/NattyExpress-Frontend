import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {product.featured && <span className="featured-badge">Featured</span>}

        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      <div className="product-card-content">
        <span className="product-category">{product.category}</span>

        <Link to={`/products/${product._id}`} className="product-name-link">
          <h3>{product.name}</h3>
        </Link>

        <p className="product-description">{product.description}</p>

        <div className="product-price">
          ₦{Number(product.price).toLocaleString()}
        </div>

        <div className="product-stock">
          {product.stock > 0 ? (
            <span>{product.stock} available</span>
          ) : (
            <span className="out-of-stock">Out of stock</span>
          )}
        </div>

        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
