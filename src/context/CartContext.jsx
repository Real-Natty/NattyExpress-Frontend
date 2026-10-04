import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("nattyexpress-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("nattyexpress-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item._id === product._id,
      );

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          setCartMessage(
            `Only ${product.stock} ${product.name} available in stock.`,
          );

          setTimeout(() => {
            setCartMessage("");
          }, 3000);

          return currentCart;
        }

        return currentCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                stock: product.stock,
              }
            : item,
        );
      }

      if (product.stock <= 0) {
        setCartMessage(`${product.name} is out of stock.`);

        setTimeout(() => {
          setCartMessage("");
        }, 3000);

        return currentCart;
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item._id !== id) {
          return item;
        }

        if (quantity > item.stock) {
          setCartMessage(`Only ${item.stock} ${item.name} available in stock.`);

          setTimeout(() => {
            setCartMessage("");
          }, 3000);

          return {
            ...item,
            quantity: item.stock,
          };
        }

        return {
          ...item,
          quantity,
        };
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
