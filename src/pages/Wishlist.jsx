import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import imageUrl from "../utils/imageUrl";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (wishlist.length === 0) {
    return (
      <main className="container wishlist-page">
        <div className="empty-wishlist">
          <h1>Your Wishlist is Empty</h1>
          <p>Save products you like and come back to them later.</p>

          <Link to="/" className="continue-shopping">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{wishlist.length} saved product(s)</p>
        </div>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div className="wishlist-card" key={product._id}>
            <Link to={`/products/${product._id}`} className="wishlist-image">
              <img src={imageUrl(product.image)} alt={product.name} />
            </Link>

            <div className="wishlist-card-content">
              <span>{product.category}</span>

              <Link to={`/products/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>

              <strong>₦{Number(product.price).toLocaleString()}</strong>

              <div className="wishlist-actions">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  className="remove-wishlist"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Wishlist;
