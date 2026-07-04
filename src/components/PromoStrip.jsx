import React, { useState, useEffect } from "react";
import { dbGetOffers } from "../firebase";
import "./PromoStrip.css";

export default function PromoStrip() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadOffers() {
      try {
        const list = await dbGetOffers();
        const welcomeMsg = {
          id: "welcome-msg",
          title: "Welcome",
          description: "Welcome to Ruthika Jewellery",
          code: "",
          discount: ""
        };
        setOffers([welcomeMsg, ...(list || [])]);
      } catch (e) {
        console.error("Error loading offers:", e);
      }
    }
    loadOffers();
    
    // Poll updates or re-fetch on tab focus/navigation
    window.addEventListener("focus", loadOffers);
    return () => window.removeEventListener("focus", loadOffers);
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4500); // 4.5 seconds rotation time
    return () => clearInterval(interval);
  }, [offers.length]);

  const getSlideClass = (index) => {
    if (offers.length <= 1) return "promo-slide active";
    if (index === currentIndex) return "promo-slide active";
    const prevIndex = (currentIndex - 1 + offers.length) % offers.length;
    if (index === prevIndex) return "promo-slide exit";
    return "promo-slide";
  };

  if (offers.length === 0) return null;

  return (
    <div className="promo-strip" style={{ background: "linear-gradient(90deg, #d4af37 0%, #f9e29b 50%, #d4af37 100%)", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1.5px solid #b38728", boxShadow: "0 2px 4px rgba(58, 6, 14, 0.15)" }}>
      <div className="promo-container">
        {offers.map((offer, index) => (
          <div
            key={offer.id || index}
            className={getSlideClass(index)}
          >
            <span className="promo-text-wrapper" style={{ color: "#110103", fontWeight: "900", fontSize: "0.95rem", letterSpacing: "0.8px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              {offer.id === "welcome-msg" ? (
                <span style={{ color: "#110103", fontWeight: "900" }}>✨ Welcome to Ruthika Jewellery ✨</span>
              ) : (
                <span style={{ color: "#110103", fontWeight: "900", display: "inline-flex", alignItems: "center", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
                  ✨ <strong style={{ color: "#110103", fontWeight: "900" }}>{offer.title}</strong>: {offer.description}
                  {offer.code && (
                    <> | USE CODE: <span className="promo-code-badge" style={{ backgroundColor: "#110103", color: "#fcf6ba", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "900", border: "1px solid #d4af37", marginLeft: "4px" }}>{offer.code}</span></>
                  )}
                  {offer.discount && <span className="promo-discount-badge" style={{ color: "#c62828", fontWeight: "900", marginLeft: "4px" }}> ({offer.discount})</span>} ✨
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
