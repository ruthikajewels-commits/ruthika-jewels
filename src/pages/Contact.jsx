import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleWhatsAppDirect = () => {
    const phoneNumber = "916303774530";
    const message = "Hello Ruthika Jewellery, I have a general enquiry about your collection. Please guide me.";
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="contact-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container">
        
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Reach Us</span>
          <h1 className="section-title">Contact Us</h1>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Direct Info Card */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.8rem", marginBottom: "25px" }}>
              Get in Touch Directly
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "30px" }}>
              Have questions about premium gold plating, custom design lengths, or special order shipping? We are here to help. Reach out to us via form, phone, or direct WhatsApp.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-gold)", backgroundColor: "var(--color-maroon-dark)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-maroon-dark)", marginBottom: "4px" }}>Showroom Address</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", whiteSpace: "pre-line" }}>
                    G.Divyareddy, 1-4-249/56/E, Balajinagar, Near Brahmana Kalyana Mandapam Open Gym, Suryapet, Telangana - 508213
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-gold)", backgroundColor: "var(--color-maroon-dark)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-maroon-dark)", marginBottom: "4px" }}>Phone & Call Support</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>+91 63037 74530</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-gold)", backgroundColor: "var(--color-maroon-dark)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-maroon-dark)", marginBottom: "4px" }}>Email Support</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>ruthikajewels@gmail.com</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                <div style={{ color: "var(--color-gold)", backgroundColor: "var(--color-maroon-dark)", padding: "12px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--color-maroon-dark)", marginBottom: "4px" }}>Store Hours</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Monday - Saturday: 10:30 AM to 8:30 PM (Sunday Closed)</p>
                </div>
              </div>

            </div>

            <div style={{ marginTop: "40px" }}>
              <button 
                onClick={handleWhatsAppDirect} 
                className="btn btn-whatsapp" 
                style={{ width: "100%", padding: "14px 20px" }}
              >
                <MessageCircle size={20} />
                Chat Directly on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-container">
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.8rem", marginBottom: "25px" }}>
              Send an Inquiry Message
            </h2>

            {submitted && (
              <div style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "15px", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", fontWeight: "600", marginBottom: "20px", borderLeft: "4px solid #2e7d32" }}>
                Thank you! Your message has been sent successfully. We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  className="form-control"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Enter details of your enquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ resize: "vertical" }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <Send size={16} />
                Send Inquiry
              </button>

            </form>
          </div>

        </div>

        {/* Full-width Map section */}
        <div className="contact-map-container">
          <iframe
            title="Ruthika Jewellery Location Showroom Map"
            src="https://maps.google.com/maps?q=Brahmana%20Kalyana%20Mandapam%20Suryapet&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
