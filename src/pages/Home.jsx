import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Truck, Sparkles } from "lucide-react";
import { dbGetProducts, dbGetCategories, dbGetBanners, dbGetOffers } from "../firebase";
import HeroBanner from "../components/HeroBanner";
import CategoryScroll from "../components/CategoryScroll";
import ProductCard from "../components/ProductCard";
import "./Home.css";

export default function Home({ onToggleWishlist, wishlist, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [prodList, catList, bannerList, offerList] = await Promise.all([
          dbGetProducts(),
          dbGetCategories(),
          dbGetBanners(),
          dbGetOffers()
        ]);
        setProducts(prodList || []);
        setCategories(catList || []);
        setBanners(bannerList || []);
        setOffers(offerList || []);
      } catch (err) {
        console.error("Error loading home page details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Filter Products
  const newArrivals = products.filter(p => p.isNew && !p.isSoldOut).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "60vh", flexDirection: "column", gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--color-border)", borderTopColor: "var(--color-gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>Loading Divine Collections...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="home-page">
      
      {/* Hero Slider */}
      <HeroBanner banners={banners} />

      {/* Categories Horizontal Scroll */}
      <CategoryScroll categories={categories} />


      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: "#fbf9f4" }}>
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Just In</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <div className="grid-products">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
            <div className="flex-center" style={{ marginTop: "40px" }}>
              <Link to="/shop" className="btn btn-secondary">
                View All New Items
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Most Loved</span>
              <h2 className="section-title">Best Sellers</h2>
            </div>
            <div className="grid-products">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
            <div className="flex-center" style={{ marginTop: "40px" }}>
              <Link to="/shop" className="btn btn-primary">
                Explore Full Collection
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Traditional Purity Features (Lord Venkateswara devotional vibe) */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Award size={40} />
              </div>
              <h3 className="feature-title">Pure Craftsmanship</h3>
              <p className="feature-desc">
                Handcrafted details made by traditional artisans with ancestral techniques.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={40} />
              </div>
              <h3 className="feature-title">Purity Certificate</h3>
              <p className="feature-desc">
                Every purchase is accompanied by a certified card assuring gold plating standards.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Sparkles size={40} />
              </div>
              <h3 className="feature-title">Custom Design</h3>
              <p className="feature-desc">
                Direct WhatsApp custom consultation for custom lengths, stones, and sizes.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Truck size={40} />
              </div>
              <h3 className="feature-title">Safe Delivery</h3>
              <p className="feature-desc">
                Insured transit and secure packaging ensures your divine jewellery arrives safely.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
