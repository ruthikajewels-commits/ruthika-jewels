import React from "react";
import { useNavigate } from "react-router-dom";
import "./WhyRuthika.css";

export default function WhyRuthika() {
  const navigate = useNavigate();

  const handleShopRedirect = () => {
    navigate("/shop");
  };

  return (
    <section className="why-ruthika-section" aria-label="Why Ruthika Jewellery selection">
      <div className="container">
        <div className="why-ruthika-frame animate-fade-in">
          
          {/* Left Content Column */}
          <div className="why-ruthika-content">
            <div className="why-ruthika-header-row">
              <h2 className="why-ruthika-title">Why RUTHIKA Jewellery ....?</h2>
              <button 
                type="button" 
                className="why-ruthika-btn-shop" 
                onClick={handleShopRedirect}
              >
                Shop Now
              </button>
            </div>

            <ul className="why-ruthika-list">
              <li className="why-ruthika-item">
                <span className="why-ruthika-icon" role="img" aria-label="star">⭐</span>
                <span className="why-ruthika-text">
                  From timeless tradition to today's trends, <strong>exclusive designs</strong> for every style.
                </span>
              </li>
              <li className="why-ruthika-item">
                <span className="why-ruthika-icon" role="img" aria-label="check">✅</span>
                <span className="why-ruthika-text">
                  Brand reputation built on <strong>trust and premium quality</strong>.
                </span>
              </li>
              <li className="why-ruthika-item">
                <span className="why-ruthika-icon" role="img" aria-label="shopping bags">🛍️</span>
                <span className="why-ruthika-text">
                  Repeated orders, countless memories <strong>trusted by thousands</strong>.
                </span>
              </li>
              <li className="why-ruthika-item">
                <span className="why-ruthika-icon" role="img" aria-label="hourglass">⏳</span>
                <span className="why-ruthika-text">
                  Experience you can trust, <strong>consistency you can feel</strong> in every piece.
                </span>
              </li>
              <li className="why-ruthika-item">
                <span className="why-ruthika-icon" role="img" aria-label="globe">🌐</span>
                <span className="why-ruthika-text">
                  <strong>Worldwide secure shipping</strong> with insured packing.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Image Column (Founder portrait) */}
          <div className="why-ruthika-img-wrapper">
            <img 
              src="/founder_new.jpg" 
              alt="Mrs. Ruthika, Founder of Ruthika Jewellery" 
              className="why-ruthika-img"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
