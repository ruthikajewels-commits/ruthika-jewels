import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="policy-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2.5rem", marginBottom: "10px", textAlign: "center" }}>
          Terms & Conditions
        </h1>
        <p className="text-muted text-center" style={{ marginBottom: "40px" }}>Last updated: July 2, 2026</p>

        <div style={{ lineHeight: "1.8", color: "var(--color-text-dark)", fontSize: "0.95rem" }}>
          
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              1. Usage Agreement
            </h2>
            <p>
              By accessing and browsing the Ruthika Jewellery website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              2. Intellectual Property
            </h2>
            <p>
              All content on this website, including but not limited to brand logos, jewellery designs, images, text, and graphics, is the intellectual property of Ruthika Jewellery. Copying, republishing, or mimicking our catalog images for commercial reseller purposes without written permission is strictly prohibited.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              3. Accuracy of Descriptions and Pricing
            </h2>
            <p>
              While we strive to ensure that all dimensions, weights, and gold plating descriptions are exact, minor artisan variances may occur in handmade jewellery. Prices and availability are subject to change without prior notice. In case a product price is listed incorrectly due to a typographical error, we reserve the right to cancel any orders made under the incorrect price.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              4. WhatsApp Orders & Inquiries
            </h2>
            <p>
              Our website serves as a digital product showcase catalog. Clicking a product inquiry button opens a communication link via WhatsApp. A conversation on WhatsApp or email does not constitute a binding sales contract. Orders are confirmed only when shipping coordinates and payment details are mutually agreed upon.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              5. Governing Law
            </h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Hyderabad, Telangana.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
