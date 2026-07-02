import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="policy-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2.5rem", marginBottom: "10px", textAlign: "center" }}>
          Privacy Policy
        </h1>
        <p className="text-muted text-center" style={{ marginBottom: "40px" }}>Last updated: July 2, 2026</p>

        <div style={{ lineHeight: "1.8", color: "var(--color-text-dark)", fontSize: "0.95rem" }}>
          
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              1. Information We Collect
            </h2>
            <p style={{ marginBottom: "15px" }}>
              At Ruthika Jewellery, we respect your privacy. We collect information you provide directly to us when filling out enquiry forms, contacting us on WhatsApp, or registering an inquiry. This information may include:
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
              <li>Contact details such as name, email address, and phone number.</li>
              <li>Product codes or SKUs that you inquire about.</li>
              <li>Details of messages or feedback you submit via contact forms.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: "15px" }}>
              We use the collected information solely to:
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
              <li>Respond to your product inquiries and share pricing/availability details.</li>
              <li>Provide customer support and follow up on orders.</li>
              <li>Improve website experience and catalog recommendations.</li>
            </ul>
            <p>
              We <strong>never sell, trade, or rent</strong> your personal identification information to third parties.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              3. Cookies and Local Storage
            </h2>
            <p>
              We use local storage (such as HTML5 LocalStorage) to persist items like your Wishlist choices on this browser session and manage fallback mock database information. No sensitive personal data is recorded in cookies.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              4. Third-Party Services (WhatsApp & Google Maps)
            </h2>
            <p>
              This website integrates links that launch WhatsApp applications and embed Google Maps frames. Interactions on these third-party platforms are governed by their respective privacy terms and agreements.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              5. Contacting Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please email us at <strong>privacy@ruthikajewellery.com</strong>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
