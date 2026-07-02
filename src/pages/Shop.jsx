import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dbGetProducts, dbGetCategories } from "../firebase";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

export default function Shop({ onToggleWishlist, wishlist, onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Sync state from query parameters on mount and query updates
  useEffect(() => {
    async function loadShopData() {
      try {
        const [prodList, catList] = await Promise.all([
          dbGetProducts(),
          dbGetCategories()
        ]);
        setProducts(prodList || []);
        setCategories(catList || []);
      } catch (err) {
        console.error("Error loading shop collections:", err);
      } finally {
        setLoading(false);
      }
    }
    loadShopData();
  }, []);

  useEffect(() => {
    const qCat = searchParams.get("category");
    const qSearch = searchParams.get("search");

    if (qCat) {
      setSelectedCategory(qCat);
    } else {
      setSelectedCategory("all");
    }

    if (qSearch) {
      setSearchQuery(qSearch);
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  // Set Search parameter changes
  const handleCategorySelect = (catId) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("wishlist");
    if (catId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", catId);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
    setSelectedCategory("all");
    setMaxPrice(100000);
    setHideSoldOut(false);
    setSortBy("featured");
  };

  const showWishlistOnly = searchParams.get("wishlist") === "true";

  // Filter & Sort computation
  const filteredProducts = products
    .filter((product) => {
      // Wishlist Match
      if (showWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }
      // Category Match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Search Query Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name ? product.name.toLowerCase().includes(query) : false;
        const matchesSku = product.sku ? product.sku.toLowerCase().includes(query) : false;
        const matchesDesc = product.description ? product.description.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }
      // Price Limit Match
      const activePrice = product.discountPrice || product.price;
      if (activePrice > maxPrice) {
        return false;
      }
      // Availability Match
      if (hideSoldOut && product.isSoldOut) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === "price-low") {
        return priceA - priceB;
      }
      if (sortBy === "price-high") {
        return priceB - priceA;
      }
      if (sortBy === "newest") {
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      }
      // Default: Featured
      return 0;
    });

  // Calculate dynamic category counts based on total database products
  const getProductCountByCategory = (catId) => {
    if (catId === "all") return products.length;
    return products.filter(p => p.category === catId).length;
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "60vh", flexDirection: "column", gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--color-border)", borderTopColor: "var(--color-gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>Opening Ruthika Showroom...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="shop-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">
            {showWishlistOnly ? "Your Favorites" : "Exquisite Catalogue"}
          </span>
          <h1 className="section-title">
            {showWishlistOnly ? "Your Wishlist" : "Our Collections"}
          </h1>
        </div>

        <div className="shop-layout">
          
          {/* Left Panel Sidebar Filters */}
          <aside className="shop-sidebar">
            
            {/* Search filter widget */}
            {searchQuery && (
              <div className="filter-widget">
                <h3 className="filter-title">Active Search</h3>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>"{searchQuery}"</span>
                  <button onClick={() => handleCategorySelect("all")} style={{ border: "none", background: "none", color: "var(--color-error)", cursor: "pointer", fontWeight: "700" }}>Clear</button>
                </div>
              </div>
            )}

            {/* Categories filter widget */}
            <div className="filter-widget">
              <h3 className="filter-title">Categories</h3>
              <ul className="filter-category-list">
                <li>
                  <button
                    className={`filter-category-btn ${selectedCategory === "all" ? "active" : ""}`}
                    onClick={() => handleCategorySelect("all")}
                  >
                    <span>All Products</span>
                    <span className="filter-category-count">({getProductCountByCategory("all")})</span>
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className={`filter-category-btn ${selectedCategory === cat.id ? "active" : ""}`}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      <span>{cat.name}</span>
                      <span className="filter-category-count">({getProductCountByCategory(cat.id)})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price slider widget */}
            <div className="filter-widget">
              <h3 className="filter-title">Price Range</h3>
              <input
                type="range"
                className="price-range-slider"
                min="1000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-range-labels">
                <span>Min: ₹1,000</span>
                <span>Max: ₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Availability checkbox widget */}
            <div className="filter-widget">
              <h3 className="filter-title">Availability</h3>
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={hideSoldOut}
                  onChange={(e) => setHideSoldOut(e.target.checked)}
                />
                <span>Hide Sold Out Items</span>
              </label>
            </div>

            {/* Reset filters */}
            <button 
              className="btn btn-secondary btn-full" 
              style={{ fontSize: "0.8rem", padding: "10px 15px" }}
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>

          </aside>

          {/* Right Panel Main Shop Grid */}
          <main className="shop-content">
            
            {/* Catalog Topbar */}
            <div className="shop-topbar">
              <span className="product-count-text">
                Showing {filteredProducts.length} premium products
              </span>

              <div className="sort-dropdown-wrapper">
                <span className="sort-label">Sort By:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Designs</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">New Arrivals First</option>
                </select>
              </div>
            </div>

            {/* Products Listing Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid-products">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products-view">
                <h2 className="no-products-title">
                  {showWishlistOnly ? "Your Wishlist is Empty" : "No Designs Found"}
                </h2>
                <p className="no-products-desc">
                  {showWishlistOnly 
                    ? "You haven't added any products to your wishlist yet. Browse our collections to add your favorites!"
                    : "We couldn't find any jewellery matching your active filters. Try adjusting your search query or price limits."
                  }
                </p>
                {showWishlistOnly ? (
                  <button className="btn btn-primary" onClick={() => handleCategorySelect("all")}>
                    Browse Collections
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleClearFilters}>
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
