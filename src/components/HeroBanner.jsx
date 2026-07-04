import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HeroBanner.css";

export default function HeroBanner({ banners = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prepend the custom "Why Ruthika" layout as slide 0
  const allSlides = [
    {
      isCustom: true,
      id: "why-ruthika-slide",
      title: "Why RUTHIKA Jewellery ....?"
    },
    ...banners
  ];

  useEffect(() => {
    if (allSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 6000); // 6 seconds slide duration for comfortable reading
    return () => clearInterval(interval);
  }, [allSlides.length]);

  if (allSlides.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  };

  const setSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-slider" aria-label="Featured Collection Slideshow">
      {allSlides.map((banner, index) => {
        if (banner.isCustom) {
          // Custom Why Ruthika Slide (replica of Image 2 frame layout)
          return (
            <div
              key={banner.id || index}
              className={`hero-slide hero-slide-custom ${index === currentSlide ? "active" : ""}`}
            >
              <div className="hero-custom-container">
                <div className="hero-custom-frame">
                  
                  {/* Left Column: Why Ruthika text lists */}
                  <div className="hero-custom-content">
                    <div className="hero-custom-header">
                      <h2 className="hero-custom-title">Why RUTHIKA Jewellery ....?</h2>
                      <Link to="/shop" className="hero-custom-btn-shop">
                        Shop Now
                      </Link>
                    </div>

                    <ul className="hero-custom-list">
                      <li>
                        <span className="hero-custom-icon">⭐</span>
                        <span className="hero-custom-text">
                          From timeless tradition to today's trends, <strong>exclusive designs</strong> for every style.
                        </span>
                      </li>
                      <li>
                        <span className="hero-custom-icon">✅</span>
                        <span className="hero-custom-text">
                          Brand reputation built on <strong>trust and premium quality</strong>.
                        </span>
                      </li>
                      <li>
                        <span className="hero-custom-icon">🛍️</span>
                        <span className="hero-custom-text">
                          Repeated orders, countless memories <strong>trusted by thousands</strong>.
                        </span>
                      </li>
                      <li>
                        <span className="hero-custom-icon">⏳</span>
                        <span className="hero-custom-text">
                          Experience you can trust, <strong>consistency you can feel</strong> in every piece.
                        </span>
                      </li>
                      <li>
                        <span className="hero-custom-icon">🌐</span>
                        <span className="hero-custom-text">
                          <strong>Worldwide secure shipping</strong> with insured packing.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column: Founder's new pink saree photo */}
                  <div className="hero-custom-img-wrapper">
                    <img 
                      src="/founder_pink.jpg" 
                      alt="G.Divyareddy, Founder of Ruthika Jewellery" 
                      className="hero-custom-image"
                    />
                  </div>

                </div>
              </div>
            </div>
          );
        }

        // Standard Promotional Slider Banner
        return (
          <div
            key={banner.id || index}
            className={`hero-slide hero-slide-standard ${index === currentSlide ? "active" : ""}`}
          >
            <div className="hero-slide-container">
              
              {/* Left Column: Text content */}
              <div className="hero-content">
                <span className="hero-subtitle">Exclusive Jewellery</span>
                <h1 className="hero-title">{banner.title}</h1>
                <p className="hero-desc">{banner.subtitle}</p>
                <Link to={banner.link || "/shop"} className="btn btn-primary">
                  Discover Collection
                </Link>
              </div>

              {/* Right Column: Product Image frame displaying the full item */}
              <div className="hero-image-wrapper">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="hero-image"
                />
              </div>

            </div>
          </div>
        );
      })}

      {/* Slide Navigation Controls */}
      {allSlides.length > 1 && (
        <>
          <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={24} />
          </button>

          <div className="hero-indicators">
            {allSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
