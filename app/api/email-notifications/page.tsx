export default async function EmailNotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const selectedPlan = params.plan;

  // ERROR SCREEN AFTER CONTINUE
  if (selectedPlan) {
    return (
      <main className="payment-page error-page">
        <div className="error-container">

          <div className="error-icon">!</div>

          <h1>Oops! 504 Error Occurred</h1>

          <p className="error-main">
            Access denied by our team security service.
          </p>

          <p className="error-description">
            You can only continue with the authorized repository and
            notification service below.
          </p>

          <div className="security-card">
            <p>
              github/matteorizzi/codes/
              <br />
              api_mail__notifications@
              <br />
              matteorizzi.com_
              <br />
              172.186.0.0.0.1_file_
              <br />
              Email notifications.tsx
            </p>
          </div>

          <a
            href="/api/email-notifications"
            className="back-button"
          >
            Back to payment plans
          </a>

        </div>

        <style>{`
          .payment-page {
            min-height: 100vh;
            width: 100%;
            margin: 0;
            padding: 0;
            background: #f5f7fb;
            color: #111827;
            font-family: Arial, Helvetica, sans-serif;
          }

          .error-page {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
          }

          .error-container {
            width: 100%;
            max-width: 650px;
            text-align: center;
          }

          .error-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 28px;
            border-radius: 50%;
            background: #ef4444;
            color: white;
            font-size: 50px;
            font-weight: 700;
            line-height: 80px;
          }

          .error-container h1 {
            margin: 0 0 20px;
            font-size: 42px;
            line-height: 1.15;
          }

          .error-main {
            margin: 0 0 15px;
            font-size: 22px;
            font-weight: 600;
            color: #374151;
          }

          .error-description {
            margin: 0 auto 30px;
            max-width: 540px;
            font-size: 18px;
            line-height: 1.6;
            color: #667085;
          }

          .security-card {
            padding: 28px 22px;
            margin-bottom: 30px;
            border-radius: 18px;
            background: #facc15;
            color: #b91c1c;
            border: 2px solid #eab308;
            font-weight: 700;
            font-size: 16px;
            line-height: 1.6;
            word-break: break-word;
          }

          .security-card p {
            margin: 0;
          }

          .back-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 55px;
            padding: 0 30px;
            border-radius: 15px;
            background: #111827;
            color: white;
            text-decoration: none;
            font-size: 17px;
            font-weight: 600;
          }

          @media (max-width: 600px) {
            .error-container h1 {
              font-size: 32px;
            }

            .error-main {
              font-size: 19px;
            }

            .error-description {
              font-size: 16px;
            }

            .security-card {
              font-size: 14px;
            }
          }
        `}</style>
      </main>
    );
  }

  // PAYMENT PLANS
  return (
    <main className="payment-page">
      <div className="payment-container">

        <section className="payment-hero">
          <h1>Choose your payment plan</h1>

          <p>
            Working access to 5,000+ email providers
            <br />
            in 189 countries and 4 cards.
          </p>
        </section>

        <section className="plans">

          {/* STARTER */}
          <div className="plan-card">
            <div>
              <h2>Starter</h2>

              <div className="price">
                <span>$9.99</span>
                <small>/month</small>
              </div>

              <div className="divider" />

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
              href="/api/email-notifications?plan=starter"
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

              <div className="divider" />

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
              href="/api/email-notifications?plan=business"
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

              <div className="divider" />

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
              href="/api/email-notifications?plan=business-pro"
              className="continue-button"
            >
              Continue
            </a>
          </div>

        </section>
      </div>

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
        }

        .plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 650px;
          padding: 42px 36px 36px;
          background: #fff;
          border: 1px solid #e3e7ed;
          border-radius: 28px;
          box-shadow: 0 15px 45px rgba(15,23,42,.07);
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
          color: white;
          font-size: 12px;
          font-weight: 700;
        }

        .plan-card h2 {
          margin: 0 0 28px;
          font-size: 31px;
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
          margin-bottom: 20px;
          color: #3d4a61;
          font-size: 17px;
          line-height: 1.4;
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
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .plans {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: auto;
          }

          .plan-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .payment-container {
            padding: 45px 18px 70px;
          }

          .payment-hero h1 {
            font-size: 39px;
          }

          .payment-hero p {
            font-size: 18px;
          }

          .plan-card {
            padding: 34px 26px 28px;
          }

          .price span {
            font-size: 46px;
          }
        }
      `}</style>
    </main>
  );
}