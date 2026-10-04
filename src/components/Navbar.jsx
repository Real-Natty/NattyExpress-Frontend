import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const search = searchTerm.trim();

    if (!search) {
      navigate("/");
      setMenuOpen(false);
      return;
    }

    navigate(`/?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          Natty<span>Express</span>
        </Link>

        {/* Desktop Search */}
        <form className="search-box desktop-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for gadgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {/* Desktop Navigation */}
        <nav className="nav-links desktop-nav">
          {user ? (
            <>
              <span>Hi, {user.name}</span>

              <Link to="/orders">My Orders</Link>

              {user.role === "admin" && <Link to="/admin">Admin</Link>}

              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/wishlist" className="wishlist-link">
            Wishlist ♡ <span>{wishlistCount}</span>
          </Link>

          <Link to="/cart" className="cart-link">
            Cart 🛒 <span>{cartCount}</span>
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for gadgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <Link to="/wishlist" onClick={closeMenu}>
            Wishlist ♡ <span>{wishlistCount}</span>
          </Link>

          <Link to="/cart" onClick={closeMenu}>
            Cart 🛒 <span>{cartCount}</span>
          </Link>

          {user ? (
            <>
              <Link to="/orders" onClick={closeMenu}>
                My Orders
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" onClick={closeMenu}>
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="mobile-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
