import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PromoStrip from "./components/PromoStrip";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { MessageCircle } from "lucide-react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { dbGetProducts } from "./firebase";

export default function App() {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);

  // Auto scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("rj_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("rj_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch products to resolve cart details
  useEffect(() => {
    async function loadProducts() {
      try {
        const list = await dbGetProducts();
        setProducts(list || []);
      } catch (e) {
        console.error("Error loading products for cart cache:", e);
      }
    }
    loadProducts();
  }, []);

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id];
      localStorage.setItem("rj_wishlist", JSON.stringify(next));
      return next;
    });
  };

  const handleAddToCart = (id) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === id);
      let next;
      if (idx > -1) {
        next = prev.map((item, i) => i === idx ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        next = [...prev, { id, quantity: 1 }];
      }
      localStorage.setItem("rj_cart", JSON.stringify(next));
      return next;
    });
    setCartOpen(true); // Auto-open cart drawer for immediate response
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem("rj_cart", JSON.stringify(next));
      return next;
    });
  };

  const handleUpdateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) => {
      const next = prev.map((item) => item.id === id ? { ...item, quantity } : item);
      localStorage.setItem("rj_cart", JSON.stringify(next));
      return next;
    });
  };

  // Resolve Cart Items with detailed product fields
  const cartItems = cart.map((cartItem) => {
    const foundProduct = products.find((p) => p.id === cartItem.id);
    return foundProduct ? { ...foundProduct, quantity: cartItem.quantity } : null;
  }).filter(Boolean);

  // Calculate total number of units in the cart
  const cartUnitsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Promo Announcement Strip */}
      <PromoStrip />

      {/* Navigation Header */}
      <Navbar 
        wishlistCount={wishlist.length} 
        cartCount={cartUnitsCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Pages Content Wrapper */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onToggleWishlist={handleToggleWishlist} 
                wishlist={wishlist} 
                onAddToCart={handleAddToCart}
              />
            } 
          />
          <Route 
            path="/shop" 
            element={
              <Shop 
                onToggleWishlist={handleToggleWishlist} 
                wishlist={wishlist} 
                onAddToCart={handleAddToCart}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetails 
                onToggleWishlist={handleToggleWishlist} 
                wishlist={wishlist} 
                onAddToCart={handleAddToCart}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/returns" element={<ReturnPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/916303774530?text=Hello%20Ruthika%20Jewellery%2C%20I%20have%20an%20enquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Shopping Cart Side Drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
}
