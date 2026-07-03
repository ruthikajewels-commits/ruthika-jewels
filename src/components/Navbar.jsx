import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, User, Lock, ShoppingBag } from "lucide-react";
import { authCheckSession } from "../firebase";
import "./Navbar.css";

export default function Navbar({ 
  wishlistCount = 0, 
  cartCount = 0, 
  onOpenCart 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if admin session exists to show dashboard shortcut
    const unsubscribe = authCheckSession((user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img 
            src="/logo.png" 
            alt="Ruthika Jewellery Logo" 
            style={{ 
              height: "55px", 
              width: "55px", 
              borderRadius: "50%", 
              objectFit: "cover",
              display: "block",
              border: "1.5px solid var(--color-gold)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
            }} 
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="logo-text" style={{ fontSize: "1.6rem", lineHeight: "1.1", fontWeight: "700" }}>RUTHIKA</span>
            <span className="logo-sub" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>JEWELLERS</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Collection
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Desktop Search */}
        <form className="nav-search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search necklaces, haarams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="nav-search-btn" aria-label="Search button">
            <Search size={18} />
          </button>
        </form>

        {/* User Actions */}
        <div className="nav-actions">
          
          {/* Wishlist Icon */}
          <Link to="/shop?wishlist=true" className="nav-icon-link" title="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="badge-count">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart Icon */}
          <button 
            type="button" 
            className="nav-icon-link" 
            onClick={onOpenCart}
            title="Shopping Cart"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Cart button"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="badge-count">{cartCount}</span>
            )}
          </button>
          
          {isAdmin ? (
            <Link to="/admin" className="nav-icon-link" title="Admin Dashboard">
              <User size={20} />
            </Link>
          ) : (
            <Link to="/admin/login" className="nav-icon-link" title="Admin Login">
              <Lock size={18} />
            </Link>
          )}

          {/* Toggle Hamburger */}
          <button className="hamburger-btn" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? "open" : ""}`} onClick={closeMenu}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <Link to="/" className="nav-logo" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <img 
                src="/logo.png" 
                alt="Ruthika Jewellery Logo" 
                style={{ 
                  height: "45px", 
                  width: "45px", 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  display: "block",
                  border: "1.5px solid var(--color-gold)"
                }} 
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="logo-text" style={{ fontSize: "1.3rem", lineHeight: "1.1", fontWeight: "700" }}>RUTHIKA</span>
                <span className="logo-sub" style={{ fontSize: "0.65rem", letterSpacing: "2px" }}>JEWELLERS</span>
              </div>
            </Link>
            <button className="drawer-close-btn" onClick={closeMenu} aria-label="Close drawer">
              <X size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <form className="form-group" onSubmit={handleSearchSubmit} style={{ marginBottom: "30px" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingRight: "40px", backgroundColor: "rgba(255,255,255,0.08)", color: "white", borderColor: "rgba(212,175,55,0.4)" }}
              />
              <button 
                type="submit" 
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer" }}
                aria-label="Search button"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Menu List */}
          <ul className="mobile-menu-list">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                onClick={closeMenu}
              >
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                onClick={closeMenu}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                onClick={closeMenu}
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => { closeMenu(); onOpenCart(); }}
                style={{ background: "none", border: "none", textLeft: "left", cursor: "pointer", width: "100%", padding: 0 }}
              >
                Shopping Cart ({cartCount})
              </button>
            </li>
            <li>
              {isAdmin ? (
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </NavLink>
              ) : (
                <NavLink 
                  to="/admin/login" 
                  className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
                  onClick={closeMenu}
                >
                  Admin Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
