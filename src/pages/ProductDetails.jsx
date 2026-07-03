import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MessageCircle, Heart, Shield, Sparkles } from "lucide-react";
import { dbGetProducts } from "../firebase";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

export default function ProductDetails({ onToggleWishlist, wishlist, onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("desc");
  const [loading, setLoading] = useState(true);
  
  // Magnify zoom coordinates state
  const [zoomOrigin, setZoomOrigin] = useState("center");

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      try {
        const prodList = await dbGetProducts();
        const currentProd = prodList.find((p) => p.id === id);
        
        if (currentProd) {
          setProduct(currentProd);
          setActiveImage(currentProd.images && currentProd.images[0] ? currentProd.images[0] : "");
          
          // Get related products from the same category
          const related = prodList
            .filter((p) => p.category === currentProd.category && p.id !== id && !p.isSoldOut)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error loading product details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
    window.scrollTo(0, 0); // Scroll to top when loading a new product detail page
  }, [id]);

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: "60vh", flexDirection: "column", gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--color-border)", borderTopColor: "var(--color-gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>Loading Design Detail...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center section-padding" style={{ minHeight: "60vh" }}>
        <h2 className="section-title">Design Not Found</h2>
        <p className="text-muted" style={{ marginBottom: "20px" }}>The jewellery item you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Magnify zoom coordinates tracker
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setZoomOrigin("center");
  };

  // Pricing formatting
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const activePrice = product.discountPrice || product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  // WhatsApp Enquiry Link trigger
  const handleWhatsAppEnquiry = () => {
    const phoneNumber = "916303774530"; // Customizable admin whatsapp number
    const productUrl = window.location.href;
    const message = `Hello Ruthika Jewellery,\n\nI am interested in purchasing this product. Please share availability details:\n\n*Name*: ${product.name}\n*SKU*: ${product.sku}\n*Price*: ${formatPrice(activePrice)}\n\nLink: ${productUrl}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="product-details-page section-padding">
      <div className="container">
        
        {/* Breadcrumb navigation */}
        <div style={{ marginBottom: "30px", fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: "500" }}>
          <Link to="/" style={{ color: "var(--color-maroon-light)" }}>Home</Link> &nbsp;/&nbsp;
          <Link to="/shop" style={{ color: "var(--color-maroon-light)" }}>Collection</Link> &nbsp;/&nbsp;
          <Link to={`/shop?category=${product.category}`} style={{ color: "var(--color-maroon-light)", textTransform: "capitalize" }}>{product.category}</Link> &nbsp;/&nbsp;
          <span style={{ color: "var(--color-text-dark)" }}>{product.name}</span>
        </div>

        <div className="details-layout">
          
          {/* Left Panel: Image Gallery */}
          <div className="gallery-container">
            <div 
              className="main-image-viewport"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={activeImage || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"} 
                alt={product.name} 
                className="main-image-zoomable"
                style={{ transformOrigin: zoomOrigin }}
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-row">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail-btn ${activeImage === img ? "active" : ""}`}
                    onClick={() => setActiveImage(img)}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="thumbnail-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Information Details */}
          <div className="info-panel">
            <span className="info-category">{product.category} Collection</span>
            <h1 className="info-title">{product.name}</h1>
            <span className="info-sku">Product Code (SKU): {product.sku}</span>

            {/* Price Box */}
            <div className="info-price-box">
              {hasDiscount ? (
                <>
                  <span className="info-price">{formatPrice(product.discountPrice)}</span>
                  <span className="info-original-price">{formatPrice(product.price)}</span>
                  <span className="info-discount-badge">SAVE {discountPercent}%</span>
                </>
              ) : (
                <span className="info-price">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Availability Badges */}
            <div className="info-status">
              {product.isSoldOut ? (
                <span className="badge badge-soldout" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>Temporarily Sold Out</span>
              ) : (
                <span className="badge badge-available" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>In Stock - Available for Order</span>
              )}
            </div>

            <p className="info-desc">{product.description}</p>

            {/* Tabbed Specification / Description Box */}
            <div className="specs-tabs-container">
              
              <div className="tab-header">
                <button 
                  className={`tab-btn ${activeTab === "desc" ? "active" : ""}`}
                  onClick={() => setActiveTab("desc")}
                >
                  Specifications
                </button>
                <button 
                  className={`tab-btn ${activeTab === "warranty" ? "active" : ""}`}
                  onClick={() => setActiveTab("warranty")}
                >
                  Warranty & Purity
                </button>
                <button 
                  className={`tab-btn ${activeTab === "care" ? "active" : ""}`}
                  onClick={() => setActiveTab("care")}
                >
                  Care Instructions
                </button>
              </div>

              <div className="tab-content">
                
                {activeTab === "desc" && (
                  !product.specifications || product.specifications.trim() === "" ? (
                    <p style={{ padding: "10px 0", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                      No specifications specified for this design. Please contact our support for sizing and custom details.
                    </p>
                  ) : (
                    <table className="specs-table">
                      <tbody>
                        {product.specifications.split(", ").map((spec, i) => {
                          const parts = spec.split(": ");
                          if (parts.length === 2) {
                            return (
                              <tr key={i}>
                                <td className="specs-label">{parts[0]}</td>
                                <td className="specs-value">{parts[1]}</td>
                              </tr>
                            );
                          }
                          return (
                            <tr key={i}>
                              <td colSpan="2" className="specs-value">{spec}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )
                )}

                {activeTab === "warranty" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <Shield size={20} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }} />
                      <p><strong>Warranty Detail:</strong> {product.warranty || "Standard Polish Warranty under standard wear conditions."}</p>
                    </div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <Sparkles size={20} style={{ color: "var(--color-gold)", flexShrink: 0, marginTop: "2px" }} />
                      <p><strong>Purity Promise:</strong> Every piece is certified hypoallergenic, handcrafted on premium copper-brass alloy bases with top-grade micro-plated 22k gold finishing.</p>
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li>Avoid direct contact with perfumes, body sprays, or cosmetics.</li>
                    <li>Remove jewellery before bathing, swimming, or washing dishes.</li>
                    <li>Avoid storing gold-plated jewellery in velvet-lined boxes. Zip-lock airtight plastic bags are recommended.</li>
                    <li>Gently wipe with a dry soft microfiber cloth after use to clean sweat or oils before storing.</li>
                  </ul>
                )}

              </div>
            </div>

            {/* Action Row: Add to Cart, WhatsApp Enquiry & Wishlist */}
            <div className="action-row">
              {product.isSoldOut ? (
                <button 
                  className="btn btn-secondary" 
                  disabled 
                  style={{ flexGrow: 1, opacity: 0.6, cursor: "not-allowed" }}
                >
                  Sold Out
                </button>
              ) : (
                <button 
                  className="btn btn-primary" 
                  onClick={() => onAddToCart(product.id)}
                  style={{ flexGrow: 1 }}
                >
                  Add to Cart
                </button>
              )}

              <button 
                className="btn btn-whatsapp details-wa-btn" 
                onClick={handleWhatsAppEnquiry}
                style={{ flexGrow: 1 }}
              >
                <MessageCircle size={20} />
                WhatsApp Enquiry
              </button>
              
              <button 
                className={`details-wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}`}
                onClick={() => onToggleWishlist(product.id)}
                title="Add to Wishlist"
                aria-label="Add to Wishlist"
              >
                <Heart size={24} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-section" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "50px" }}>
            <div className="section-title-wrapper" style={{ marginBottom: "35px" }}>
              <span className="section-subtitle">Recommended For You</span>
              <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Related Designs</h2>
            </div>
            <div className="grid-products">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
