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
    <div className="promo-strip">
      <div className="promo-container">
        {offers.map((offer, index) => (
          <div
            key={offer.id || index}
            className={getSlideClass(index)}
          >
            <span className="promo-text-wrapper">
              {offer.id === "welcome-msg" ? (
                <span>✨ WELCOME TO RUTHIKA JEWELLERY ✨</span>
              ) : (
                <span>
                  ✨ <strong>{offer.title}</strong>: {offer.description}
                  {offer.code && (
                    <> | USE CODE: <span className="promo-code-badge">{offer.code}</span></>
                  )}
                  {offer.discount && <span className="promo-discount-badge"> ({offer.discount})</span>} ✨
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
