import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("nattyexpress-wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("nattyexpress-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item._id === product._id,
      );

      if (alreadySaved) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item._id !== id),
    );
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
