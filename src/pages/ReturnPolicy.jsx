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
          
          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              1. Overview of Return Criteria
            </h2>
            <p>
              Due to the delicate, handcrafted nature of temple jewelry, we do not support general refunds or returns based on design preferences. We only accept returns or free replacements if:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
              <li>The product arrives damaged during transit.</li>
              <li>You receive a completely incorrect design or SKU from the one ordered.</li>
              <li>The item has manufacturing issues or stone missing defects straight out of packaging.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              2. Open Box Video Requirement
            </h2>
            <p style={{ fontWeight: "600", color: "var(--color-maroon-light)" }}>
              ⚠️ IMPORTANT: To claim damages or incorrect item replacements, customers MUST record a continuous unboxing video starting from showing the sealed shipping package label, and opening the parcel, showing the item's damage on camera.
            </p>
            <p style={{ marginTop: "10px" }}>
              Claims submitted without a valid, unedited unboxing/open-box video will not be approved.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              3. Timeframe for Claims
            </h2>
            <p>
              Transit damages or defective product claims must be reported within <strong>48 hours of delivery</strong>. Please message us on WhatsApp or email us at <strong>returns@ruthikajewellery.com</strong> with the unboxing video and order details.
            </p>
          </section>

          <section style={{ marginBottom: "30px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              4. Replacement Process
            </h2>
            <p>
              Once your damage claim is verified:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
              <li>We will arrange a reverse pickup (or request you to ship it back, reimbursing standard shipping costs).</li>
              <li>The returned item must be unused, in its original packaging frame.</li>
              <li>Upon receiving the damaged item, we will ship a fresh replacement within 3-5 working days. If the design is sold out, we will issue a store credit coupon or refund.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "1.4rem", marginBottom: "15px" }}>
              5. Polish Warranty
            </h2>
            <p>
              For products offering a 6-month or 1-year polish warranty, if gold micro-plating fades prematurely under normal wear (excluding chemical spray exposure), we will polish the item free of cost. Reverse shipping costs are to be borne by the customer.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
