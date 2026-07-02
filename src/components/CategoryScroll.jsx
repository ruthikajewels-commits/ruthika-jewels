import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryScroll.css";

// Unsplash category specific image mappings for Ruthika Jewellery
const categoryImages = {
  haarams: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=150&h=150&q=80",
  necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=150&h=150&q=80",
  earrings: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=150&h=150&q=80",
  hipbelts: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=150&h=150&q=80",
  blackbeads: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=150&h=150&q=80",
  bangles: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=150&h=150&q=80"
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

  const getCategoryImage = (catId) => {
    return categoryImages[catId] || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&h=150&q=80";
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
                    src={getCategoryImage(category.id)}
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
