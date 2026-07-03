import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <img 
                src="/logo.png" 
                alt="Ruthika Jewellery Logo" 
                style={{ 
                  height: "75px", 
                  width: "75px", 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  display: "block",
                  border: "1.5px solid var(--color-gold)"
                }} 
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="logo-text" style={{ fontSize: "1.6rem", lineHeight: "1.1", fontWeight: "700" }}>RUTHIKA</span>
                <span className="logo-sub" style={{ fontSize: "0.75rem", letterSpacing: "3px" }}>JEWELLERS</span>
              </div>
            </Link>
            <p className="footer-description">
              Handcrafted with devotion. Bringing you the finest gold-plated temple jewelry, exquisite Haarams, Kundan necksets, and bridal accessories that reflect spiritual grace.
            </p>
            <div className="footer-socials">
              <a 
                href="https://www.instagram.com/ruthikajewellery?igsh=MTV3djlma2w2d2p5eA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                aria-label="Instagram link"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/people/Ruthika-Jewellery/61590867037439/?sk=reels_tab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                aria-label="Facebook link"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-3 0-5 1.8-5 5v1z" />
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@ruthikajewellery/featured" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                aria-label="YouTube link"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.516 3.545 12 3.545 12 3.545s-7.516 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.872.508 9.388.508 9.388.508s7.516 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/">Home Dashboard</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/shop">Shop Collection</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about">Our Story</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact">Reach Us</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/admin">Admin Area</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Our Policies</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/returns">Return & Refund Policy</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li className="footer-link-item">
                <a 
                  href="https://wa.me/916303774530" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location Info Column */}
          <div className="footer-info-col">
            <h4 className="footer-col-title">Get In Touch</h4>
            <ul className="footer-info-list">
              <li className="footer-info-item">
                <MapPin size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                <a 
                  href="https://maps.google.com/?q=G.Divyareddy+1-4-249/56/E+Balajinagar+Suryapet+Brahmana+Kalyana+Mandapam+open+gym+Suryapet+Suryapet+Telagana+508213" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  style={{ whiteSpace: "pre-line" }}
                >
                  G.Divyareddy, 1-4-249/56/E, Balajinagar, Near Brahmana Kalyana Mandapam Open Gym, Suryapet, Telangana - 508213
                </a>
              </li>
              <li className="footer-info-item">
                <Phone size={18} style={{ flexShrink: 0 }} />
                <a href="tel:+916303774530" className="footer-contact-link">
                  +91 63037 74530
                </a>
              </li>
              <li className="footer-info-item">
                <Mail size={18} style={{ flexShrink: 0 }} />
                <a href="mailto:ruthikajewels@gmail.com" className="footer-contact-link">
                  ruthikajewels@gmail.com
                </a>
              </li>
              <li className="footer-info-item">
                <Clock size={18} style={{ flexShrink: 0 }} />
                <span>Mon - Sun: 6:00 AM to 10:00 PM</span>
              </li>
            </ul>

            <div style={{ marginTop: "20px" }}>
              <div className="footer-map-container">
                <iframe
                  title="Ruthika Jewellery Location Map"
                  src="https://maps.google.com/maps?q=Brahmana%20Kalyana%20Mandapam%20Suryapet&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a
                  href="https://maps.google.com/?q=G.Divyareddy+1-4-249/56/E+Balajinagar+Suryapet+Brahmana+Kalyana+Mandapam+open+gym+Suryapet+Suryapet+Telagana+508213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-overlay-btn"
                >
                  Open Map <ExternalLink size={10} style={{ marginLeft: "3px", display: "inline-block" }} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ruthika Jewellery. All Rights Reserved. Crafted with spiritual devotion.</p>
          <p>
            Powered by <a 
              href="https://wa.me/917671960993?text=Hello%20VNVR%20Team%20from%20Ruthika%20Jewellery%20Website" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "var(--color-gold)", fontWeight: "600", textDecoration: "none" }}
            >
              VNVR Team
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
