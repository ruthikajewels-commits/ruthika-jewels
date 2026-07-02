import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import "./CartDrawer.css";

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveFromCart 
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    doorNo: "",
    areaName: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    altPhone: ""
  });

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

  // WhatsApp Cart Checkout: triggers the shipping coordinates form modal
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    setShowForm(true);
  };

  // Compile items + shipping details and redirect to WhatsApp
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = "916303774530"; // Admin whatsapp number
    let message = "*RUTHIKA Jewellery - New Order Request*\n\n";
    
    message += "*Ordered Designs:*\n";
    cartItems.forEach((item, index) => {
      const activePrice = item.discountPrice || item.price;
      const itemTotal = activePrice * item.quantity;
      message += `${index + 1}. *${item.name}* (SKU: ${item.sku}) - Qty: ${item.quantity} x ${formatPrice(activePrice)} = ${formatPrice(itemTotal)}\n`;
    });
    
    message += `\n*Total Order Value*: ${formatPrice(totalPrice)}\n\n`;
    
    message += "*Customer Shipping Coordinates:*\n";
    message += `• *Name:* ${formData.name}\n`;
    message += `• *Contact Number:* ${formData.phone}\n`;
    if (formData.altPhone) {
      message += `• *Alternative Number:* ${formData.altPhone}\n`;
    }
    message += `• *Address:* Door No: ${formData.doorNo}, Area Name: ${formData.areaName}, Landmark: ${formData.landmark}\n`;
    message += `• *City:* ${formData.city}\n`;
    message += `• *Pincode:* ${formData.pincode}\n`;
    message += `• *State:* ${formData.state}\n\n`;
    
    message += "Please verify availability and share payment steps. Thank you!";

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    
    setShowForm(false);
    onClose();
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

      {/* Shipping Address Form Modal Overlay */}
      {showForm && (
        <div className="checkout-modal-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="checkout-modal animate-fade-in">
            <div className="checkout-modal-header">
              <h4>Shipping Details</h4>
              <button onClick={() => setShowForm(false)} className="checkout-modal-close" aria-label="Close form">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="checkout-form">
              <div className="form-grid">
                <div className="form-group-full">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div className="form-group-half">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter mobile number"
                  />
                </div>
                
                <div className="form-group-half">
                  <label>Alternative Number</label>
                  <input
                    type="tel"
                    value={formData.altPhone}
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                    placeholder="Enter alternative number"
                  />
                </div>

                <div className="form-group-third">
                  <label>Door No *</label>
                  <input
                    type="text"
                    required
                    value={formData.doorNo}
                    onChange={(e) => setFormData({ ...formData, doorNo: e.target.value })}
                    placeholder="Flat / Door / House No"
                  />
                </div>

                <div className="form-group-third">
                  <label>Area Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.areaName}
                    onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                    placeholder="Street / Area Name"
                  />
                </div>

                <div className="form-group-third">
                  <label>Landmark *</label>
                  <input
                    type="text"
                    required
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="Nearby landmark"
                  />
                </div>

                <div className="form-group-third">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group-third">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6-digit pincode"
                  />
                </div>

                <div className="form-group-third">
                  <label>State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Enter state"
                  />
                </div>
              </div>
              
              <button type="submit" className="btn btn-whatsapp btn-full" style={{ marginTop: "20px" }}>
                Send Order to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
