import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import "./ProductCard.css";

export default function ProductCard({ 
  product, 
  isWishlisted = false, 
  onToggleWishlist,
  onAddToCart
}) {
  const { id, name, sku, category, price, discountPrice, images, isNew, isBestSeller, isSoldOut } = product;

  // Calculate discount percentage
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount 
    ? Math.round(((price - discountPrice) / price) * 100) 
    : 0;

  // Format currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  // WhatsApp Enquiry Link
  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const phoneNumber = "916303774530"; // Customizable admin whatsapp number
    const productUrl = `${window.location.origin}/product/${id}`;
    const activePrice = discountPrice || price;
    const message = `Hello Ruthika Jewellery,\n\nI am interested in enquiring about this product:\n*Name*: ${name}\n*SKU*: ${sku}\n*Price*: ${formatPrice(activePrice)}\n\nLink: ${productUrl}\n\nPlease share availability and details.`;
    
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  // Human readable category mapping
  const categoryNames = {
    haarams: "Haaram",
    necklaces: "Necklace",
    earrings: "Earrings",
    hipbelts: "Hip Belt",
    blackbeads: "Black Beads",
    bangles: "Bangles"
  };

  const displayCategory = categoryNames[category] || category;

  return (
    <article className="product-card" style={{ position: "relative" }}>
      
      {/* Wishlist Button - Placed outside Link for correct propagation and valid HTML */}
      <button 
        type="button" 
        className={`product-card-wishlist ${isWishlisted ? "active" : ""}`}
        onClick={handleWishlistClick}
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        aria-label="Wishlist button"
        style={{ zIndex: 10 }}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${id}`} className="product-card-link" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Image and Badges */}
        <div className="product-card-img-wrapper">
          <img 
            src={images && images[0] ? images[0] : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80"} 
            alt={name} 
            className="product-card-img"
            loading="lazy"
          />
          
          {/* Status Badges */}
          <div className="product-card-badges">
            {isSoldOut ? (
              <span className="badge badge-soldout">Sold Out</span>
            ) : (
              <>
                {isNew && <span className="badge badge-available">New</span>}
                {isBestSeller && <span className="badge badge-offer">Best Seller</span>}
                {hasDiscount && <span className="badge badge-offer">-{discountPercent}%</span>}
              </>
            )}
          </div>

          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="soldout-overlay">
              <div className="soldout-banner">Sold Out</div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="product-card-body" style={{ paddingBottom: "10px" }}>
          <span className="product-card-category">{displayCategory}</span>
          <h3 className="product-card-title">{name}</h3>

          {/* Price Layout */}
          <div className="product-card-price-row" style={{ marginBottom: "15px" }}>
            {hasDiscount ? (
              <>
                <span className="product-card-price">{formatPrice(discountPrice)}</span>
                <span className="product-card-original-price">{formatPrice(price)}</span>
              </>
            ) : (
              <span className="product-card-price">{formatPrice(price)}</span>
            )}
          </div>
        </div>

      </Link>

      {/* Action Row - Placed outside of the Link to prevent click bubble navigation */}
      <div style={{ padding: "0 15px 15px 15px", display: "flex", gap: "10px", marginTop: "-5px", zIndex: 10, position: "relative" }}>
        
        {isSoldOut ? (
          <button 
            type="button" 
            className="btn btn-secondary btn-full"
            disabled
            style={{ fontSize: "0.75rem", padding: "8px 12px", opacity: 0.6, cursor: "not-allowed" }}
          >
            Sold Out
          </button>
        ) : (
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddToCartClick}
            style={{ flexGrow: 1, fontSize: "0.75rem", padding: "8px 12px" }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        )}

        <button 
          type="button" 
          className="product-card-btn-wa"
          onClick={handleWhatsAppEnquiry}
          title="Enquire on WhatsApp"
          aria-label="Enquire on WhatsApp"
          style={{ width: "36px", height: "36px" }}
        >
          <MessageCircle size={18} />
        </button>
      </div>

    </article>
  );
}
