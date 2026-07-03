import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryScroll.css";

// Category specific image mappings for Ruthika Jewellery
const categoryImages = {
  haarams: "/haarams_cat.png",
  necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&h=150&q=80",
  earrings: "/earrings_cat.png",
  hipbelts: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=150&h=150&q=80",
  blackbeads: "/blackbeads_cat.png",
  bangles: "/bangles_cat.png"
};

export default function CategoryScroll({ categories = [], onSelectCategory }) {
  const navigate = useNavigate();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      navigate(`/shop?category=${catId}`);
    }
  };

  const getCategoryImage = (category) => {
    const id = (category.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = (category.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    
    if (id.includes("haaram") || name.includes("haaram")) return "/haarams_cat.png";
    if (id.includes("earring") || name.includes("earring")) return "/earrings_cat.png";
    if (id.includes("blackbead") || name.includes("blackbead") || id.includes("mangalsutra") || name.includes("mangalsutra")) return "/blackbeads_cat.png";
    if (id.includes("bangle") || name.includes("bangle")) return "/bangles_cat.png";
    if (id.includes("necklace") || name.includes("necklace")) return categoryImages.necklaces;
    if (id.includes("hipbelt") || name.includes("hipbelt") || id.includes("vaddanam") || name.includes("vaddanam")) return categoryImages.hipbelts;
    
    return categoryImages[category.id] || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&h=150&q=80";
  };

  return (
    <section className="category-scroll-section" aria-label="Product Categories scroll list">
      <div className="container">
        <div className="category-scroll-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-circle-wrapper">
                <div className="category-circle-inner">
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="category-img"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
