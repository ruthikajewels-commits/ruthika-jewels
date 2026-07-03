import React from "react";
import { Link } from "react-router-dom";
import { Award, Compass, Heart, Users, Sparkles } from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container">
        
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Our Heritage</span>
          <h1 className="section-title">About Our Brand</h1>
        </div>

        {/* Introduction Section */}
        <div className="about-intro-grid">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2rem", marginBottom: "20px", lineHeight: "1.3" }}>
              Adorning Devotion with Premium Craftsmanship
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-dark)", marginBottom: "15px" }}>
              Welcome to <strong>Ruthika Jewellery</strong>, where spiritual elegance meets modern luxury. Established with the vision of offering high-quality, handcrafted temple jewelry, we specialize in creations inspired by the divine ornamentation of traditional Indian heritage.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-dark)", marginBottom: "15px" }}>
              Our collections feature premium gold-plated necksets, Haarams, Vaddanams (hip belts), Jhumkas, and black bead chains that echo the grandeur of sacred sculptures. Our colors represent spiritual devotion: gold for prosperity, deep maroon/saffron representing traditional kumkum borders, and indigo reflecting the infinite sky.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-dark)" }}>
              We pride ourselves on offering jewelry that looks and feels exactly like solid gold temple jewelry but at a fraction of the cost, making royal Indian designs accessible for weddings, festivals, and special occasions.
            </p>
          </div>
          <div>
            <div className="about-intro-img-frame">
              <img 
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=500&q=80" 
                alt="Crafting Jewellery" 
                className="about-intro-img"
              />
            </div>
          </div>
        </div>

        {/* Meet the Founder Section */}
        <div className="about-founder-grid">
          <div>
            <div className="about-founder-card">
              <img 
                src="/founder.jpg" 
                alt="G.Divyareddy, Founder of Ruthika Jewellery" 
                className="about-founder-img"
              />
              <div className="about-founder-label">
                G.Divyareddy, Founder
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <span className="section-subtitle" style={{ fontSize: "0.8rem", color: "var(--color-gold-dull)" }}>The Visionary</span>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2.2rem", marginBottom: "20px", lineHeight: "1.3" }}>
              Meet Our Founder
            </h2>
            
            <blockquote style={{ borderLeft: "4px solid var(--color-gold)", paddingLeft: "20px", fontStyle: "italic", fontSize: "1.1rem", color: "var(--color-maroon-light)", marginBottom: "25px", lineHeight: "1.6", fontWeight: "500" }}>
              "Traditional jewellery is not merely an accessory; it is a repository of heritage, culture, and deep-seated devotion. My vision is to make every woman feel like a queen adorned in sacred temple art on her special day."
            </blockquote>

            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-dark)", marginBottom: "15px" }}>
              G.Divyareddy founded <strong>Ruthika Jewellery</strong> with a singular, clear passion: to preserve the ornate grandeur of classical Indian temple ornaments and present them in premium, durable, gold-plated forms. As an avid admirer of Indian temple architecture, she observed the intricate jewelry details on divine deities and set out to collaborate with expert traditional artisans to recreate those sacred patterns.
            </p>
            
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--color-text-dark)", marginBottom: "20px" }}>
              Under her curation, every design—whether it is a heavy Kasulaperu Haaram, a stone-studded Choker, or a detailed Lakshmi Vaddanam—undergoes rigorous quality testing to ensure the gold plating stands the test of time. Her hands-on curation ensures that the spiritual beauty of Indian bridal fashion is delivered with complete transparency and purity.
            </p>

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Sparkles size={20} style={{ color: "var(--color-gold)" }} />
              <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-maroon-dark)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Handpicked Divine Collections
              </span>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="about-values-box">
          <h2 className="text-center" style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2rem", marginBottom: "40px" }}>
            Our Pillars of Trust
          </h2>
          
          <div className="about-values-grid">
            
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--color-gold)", marginBottom: "15px", display: "inline-block" }}>
                <Award size={36} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-maroon-dark)", marginBottom: "10px" }}>Unmatched Quality</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                We use high-grade copper-brass alloy bases with multi-layered 22k gold micro-plating to ensure lasting shine and hypoallergenic wear.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--color-gold)", marginBottom: "15px", display: "inline-block" }}>
                <Compass size={36} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-maroon-dark)", marginBottom: "10px" }}>Ancestral Craft</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                Our pieces are curated and finished by veteran goldsmiths who have been designing temple jewelry for generations.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--color-gold)", marginBottom: "15px", display: "inline-block" }}>
                <Heart size={36} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-maroon-dark)", marginBottom: "10px" }}>Devotional Spirit</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                Each design draws inspiration from spiritual motifs—the lotus, peacocks, temple gopurams, and traditional divine deities.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--color-gold)", marginBottom: "15px", display: "inline-block" }}>
                <Users size={36} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-maroon-dark)", marginBottom: "10px" }}>Customer First</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                Through direct WhatsApp connection, we offer personal consultations, answering all questions and helping you choose the perfect fit.
              </p>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" style={{ padding: "30px 0" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.8rem", marginBottom: "20px" }}>
            Explore Our Divine Showcase
          </h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 30px auto" }}>
            Find the perfect Harram, Necklace, or Bangles for your upcoming celebration. Experience premium Indian temple fashion today.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Browse Full Catalogue
          </Link>
        </div>

      </div>
    </div>
  );
}
