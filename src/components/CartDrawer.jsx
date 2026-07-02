import React from "react";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import "./CartDrawer.css";

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveFromCart 
}) {

  // Calculate Subtotal
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.discountPrice || item.price;
    return acc + (price * item.quantity);
  }, 0);

  // Format currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  // WhatsApp Cart Checkout Order compiled message
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    const phoneNumber = "916303774530"; // Customizable admin whatsapp number
    let message = "Hello Ruthika Jewellery,\n\nI would like to place an order for the following designs:\n\n";
    
    cartItems.forEach((item, index) => {
      const activePrice = item.discountPrice || item.price;
      const itemTotal = activePrice * item.quantity;
      message += `${index + 1}. *${item.name}*\n   SKU: ${item.sku}\n   Qty: ${item.quantity} x ${formatPrice(activePrice)} = ${formatPrice(itemTotal)}\n\n`;
    });
    
    message += `*Total Order Value*: ${formatPrice(totalPrice)}\n\n`;
    message += "Please verify availability and share payment/delivery steps.";

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <h3 className="cart-drawer-title">Shopping Cart</h3>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Drawer Scrollable Items */}
        <div className="cart-drawer-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.images && item.images[0] ? item.images[0] : ""} 
                  alt={item.name} 
                  className="cart-item-img" 
                />
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-sku">SKU: {item.sku}</div>
                  
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">
                      {formatPrice(item.discountPrice || item.price)}
                    </span>
                    
                    {/* Quantity selectors */}
                    <div className="qty-selector">
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button 
                  className="cart-item-remove" 
                  onClick={() => onRemoveFromCart(item.id)}
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="cart-empty-view">
              <ShoppingBag size={48} style={{ color: "var(--color-border)" }} />
              <p>Your shopping cart is empty.</p>
              <button className="btn btn-secondary" onClick={onClose} style={{ fontSize: "0.8rem", padding: "8px 16px" }}>
                Browse Collections
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal:</span>
              <span className="cart-summary-total">{formatPrice(totalPrice)}</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "15px", lineHeight: "1.4" }}>
              Shipping and GST calculated on WhatsApp during checkout validation.
            </p>
            <button 
              className="btn btn-whatsapp cart-checkout-btn" 
              onClick={handleWhatsAppCheckout}
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
