import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="policy-page section-padding" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2.5rem", marginBottom: "10px", textAlign: "center" }}>
          Return & Replacement Policy
        </h1>
        <p className="text-muted text-center" style={{ marginBottom: "40px" }}>Last updated: July 2, 2026</p>

        <div style={{ lineHeight: "1.8", color: "var(--color-text-dark)", fontSize: "0.95rem" }}>
          
          {/* Delivery Time Section */}
          <div style={{ padding: "22px", border: "1.5px solid var(--color-gold)", borderRadius: "8px", background: "rgba(212,175,55,0.05)", marginBottom: "35px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.5rem", marginBottom: "15px", borderBottom: "1.5px solid rgba(212,175,55,0.2)", paddingBottom: "8px" }}>
              Delivery time:
            </h2>
            <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem", color: "var(--color-text-dark)", lineHeight: "1.6" }}>
              <li>
                <strong>5 to 7 working days</strong> from your ordered date for non making products like necksets, harams, accessories etc..
              </li>
              <li>
                <strong>5 to 7 working days</strong> for handmaking items like beads, beads harams etc..
              </li>
              <li>
                Please verify your complete details before placing an order like correct address with pincode, contact details to avoid late delivery and returns.
              </li>
            </ol>
          </div>

          <p style={{ marginBottom: "25px", fontSize: "1.05rem", fontWeight: "600", color: "var(--color-maroon-dark)" }}>
            Return & Replacement Conditions:
          </p>
          <p style={{ marginBottom: "25px", fontSize: "1.02rem", fontWeight: "500" }}>
            Due to the delicate, handcrafted nature of temple jewelry, we do not support general refunds or returns based on design preferences. We only accept returns or replacements under the following two conditions:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "25px", marginBottom: "35px" }}>
            <div style={{ padding: "20px", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.2rem", marginBottom: "10px" }}>
                1. Incorrect Product Delivered
              </h3>
              <p>
                If by mistake you receive a completely different design or SKU from the one ordered (for example: you ordered a ring but received a necklace), we will replace it.
              </p>
            </div>

            <div style={{ padding: "20px", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.2rem", marginBottom: "10px" }}>
                2. Product Arrives Damaged
              </h3>
              <p>
                If the product is damaged during transit, you are eligible for a replacement or a return.
              </p>
            </div>
          </div>

          <div style={{ padding: "20px", border: "2px solid var(--color-gold)", borderRadius: "8px", background: "rgba(58,6,14,0.05)", marginBottom: "30px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.2rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚠️ Mandatory Unboxing Video Proof
            </h3>
            <p style={{ fontWeight: "600", color: "var(--color-maroon-dark)" }}>
              To claim a replacement for damage or an incorrect item, customers MUST record a single, continuous, unedited unboxing video starting from showing the sealed shipping package label, opening the parcel, and showing the item's condition clearly on camera.
            </p>
            <p style={{ marginTop: "10px", fontWeight: "500" }}>
              Claims submitted without a valid, unedited open-box video will not be approved.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
