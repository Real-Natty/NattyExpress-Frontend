import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import imageUrl from "../utils/imageUrl";

function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);

        setMessage("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="container">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <main className="container product-details-page">
      <div className="product-details">
        <div className="product-details-image">
          <img src={imageUrl(product.image)} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="product-category">{product.category}</p>

          <h1>{product.name}</h1>

          <h2>₦{Number(product.price).toLocaleString()}</h2>

          <p className="product-details-description">{product.description}</p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>

          {product.stock > 0 ? (
            <button
              className="add-to-cart-button"
              onClick={() => {
                addToCart(product);
                setMessage("Product added to cart!");
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button disabled>Out of Stock</button>
          )}

          {message && <p>{message}</p>}
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
