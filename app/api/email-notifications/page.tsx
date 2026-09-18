export default function EmailNotificationsPage() {
  return (
    <main className="payment-page">
      <div className="payment-container">

        {/* Page heading */}
        <section className="payment-hero">
          <h1>Choose your payment plan</h1>

          <p>
            Working access to 5,000+ email providers
            <br />
            in 189 countries and 4 cards.
          </p>
        </section>

        {/* Payment plans */}
        <section className="plans">

          {/* STARTER */}
          <div className="plan-card">
            <div>
              <h2>Starter</h2>

              <div className="price">
                <span>$9.99</span>
                <small>/month</small>
              </div>

              <div className="divider"></div>

              <ul>
                <li>✓ <span>5,000 emails</span></li>
                <li>✓ <span>1 website</span></li>
                <li>✓ <span>HTTPS security</span></li>
                <li>✓ <span>SSL protocol</span></li>
                <li>✓ <span>Spam detector</span></li>
                <li>✓ <span>Instant reply</span></li>
              </ul>
            </div>

            <a
              href="/api/email-notifications/starter"
              className="continue-button"
            >
              Continue
            </a>
          </div>


          {/* BUSINESS */}
          <div className="plan-card popular">
            <div className="popular-label">POPULAR</div>

            <div>
              <h2>Business</h2>

              <div className="price">
                <span>$19.90</span>
                <small>/month</small>
              </div>

              <div className="divider"></div>

              <ul>
                <li>✓ <span>10,000 emails</span></li>
                <li>✓ <span>3 websites</span></li>
                <li>✓ <span>HTTPS security</span></li>
                <li>✓ <span>SSL protocol</span></li>
                <li>✓ <span>Spam detector</span></li>
                <li>✓ <span>Instant reply</span></li>
              </ul>
            </div>

            <a
              href="/api/email-notifications/business"
              className="continue-button"
            >
              Continue
            </a>
          </div>


          {/* BUSINESS PRO */}
          <div className="plan-card">
            <div>
              <h2>Business Pro</h2>

              <div className="price">
                <span>$49.90</span>
                <small>/month</small>
              </div>

              <div className="divider"></div>

              <ul>
                <li>✓ <span>50,000 emails</span></li>
                <li>✓ <span>10 websites</span></li>
                <li>✓ <span>HTTPS security</span></li>
                <li>✓ <span>SSL protocol</span></li>
                <li>✓ <span>Spam detector</span></li>
                <li>✓ <span>Instant reply</span></li>
                <li>✓ <span>10 forwarding emails</span></li>
                <li>✓ <span>Private reply with no-reply</span></li>
              </ul>
            </div>

            <a
              href="/api/email-notifications/business-pro"
              className="continue-button"
            >
              Continue
            </a>
          </div>

        </section>

      </div>

      {/* Page-specific styling */}
      <style>{`
        .payment-page {
          box-sizing: border-box;
          background: #f5f7fb;
          color: #111827;
          font-family: Arial, Helvetica, sans-serif;
        }

        .payment-page *,
        .payment-page *::before,
        .payment-page *::after {
          box-sizing: border-box;
        }

        .payment-container {
          width: 100%;
          max-width: 1250px;
          margin: 0 auto;
          padding: 70px 24px 90px;
        }

        .payment-hero {
          text-align: center;
          margin-bottom: 55px;
        }

        .payment-hero h1 {
          margin: 0 auto 22px;
          max-width: 700px;
          font-size: 52px;
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -2px;
        }

        .payment-hero p {
          margin: 0;
          color: #667085;
          font-size: 22px;
          line-height: 1.6;
        }

        .plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 650px;
          padding: 42px 36px 36px;
          background: #ffffff;
          border: 1px solid #e3e7ed;
          border-radius: 28px;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.07);
        }

        .plan-card.popular {
          border: 2px solid #4967d8;
        }

        .popular-label {
          position: absolute;
          top: -14px;
          right: 28px;
          padding: 8px 18px;
          border-radius: 20px;
          background: #4967d8;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .5px;
        }

        .plan-card h2 {
          margin: 0 0 28px;
          font-size: 31px;
          line-height: 1.2;
        }

        .price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 35px;
        }

        .price span {
          font-size: 52px;
          font-weight: 700;
          letter-spacing: -2px;
        }

        .price small {
          color: #667085;
          font-size: 17px;
        }

        .divider {
          height: 1px;
          background: #e5e7eb;
          margin-bottom: 30px;
        }

        .plan-card ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .plan-card li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 20px;
          color: #3d4a61;
          font-size: 17px;
          line-height: 1.4;
        }

        .plan-card li:first-letter {
          color: #3d9b67;
        }

        .continue-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 58px;
          margin-top: 35px;
          border-radius: 18px;
          background: #111827;
          color: #ffffff;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          transition: opacity .2s ease;
        }

        .continue-button:hover {
          opacity: .88;
        }

        @media (max-width: 900px) {
          .plans {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto;
          }

          .plan-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .payment-container {
            padding: 45px 18px 70px;
          }

          .payment-hero {
            margin-bottom: 40px;
          }

          .payment-hero h1 {
            font-size: 39px;
            letter-spacing: -1.5px;
          }

          .payment-hero p {
            font-size: 18px;
            line-height: 1.5;
          }

          .plan-card {
            padding: 34px 26px 28px;
            border-radius: 24px;
          }

          .plan-card h2 {
            font-size: 28px;
          }

          .price span {
            font-size: 46px;
          }
        }
      `}</style>
    </main>
  );
}