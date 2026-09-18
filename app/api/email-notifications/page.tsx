export default function EmailNotificationsPage() {
  return (
    <main className="page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Arial, sans-serif;
          background: #f5f7fb;
          color: #111827;
        }

        .page {
          min-height: 100vh;
          padding: 40px 16px;
        }

        .container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 35px;
        }

        .label {
          display: inline-block;
          background: #e9efff;
          color: #3157c9;
          padding: 8px 13px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        h1 {
          font-size: clamp(30px, 7vw, 48px);
          line-height: 1.08;
          margin: 15px 0 10px;
          letter-spacing: -.04em;
        }

        .subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #667085;
          line-height: 1.6;
        }

        .plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .card {
          background: white;
          border: 1px solid #e4e7ec;
          border-radius: 22px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(16, 24, 40, .07);
        }

        .popular {
          border: 2px solid #3157c9;
        }

        .badge {
          align-self: flex-end;
          background: #3157c9;
          color: white;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
        }

        .name {
          font-size: 21px;
          font-weight: 800;
          margin: 7px 0 12px;
        }

        .price {
          font-size: 40px;
          font-weight: 900;
          letter-spacing: -.04em;
        }

        .price small {
          font-size: 14px;
          color: #667085;
          font-weight: 600;
        }

        .line {
          height: 1px;
          background: #eaecf0;
          margin: 23px 0;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: grid;
          gap: 12px;
        }

        li {
          color: #475467;
          font-size: 14px;
        }

        li::before {
          content: "✓";
          display: inline-grid;
          place-items: center;
          width: 21px;
          height: 21px;
          margin-right: 9px;
          border-radius: 50%;
          background: #edf7ee;
          color: #198754;
          font-weight: 900;
          font-size: 12px;
        }

        .continue {
          display: block;
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          background: #111827;
          color: white;
          text-align: center;
          text-decoration: none;
          font-size: 15px;
          font-weight: 800;
          margin-top: auto;
        }

        .popular .continue {
          background: #3157c9;
        }

        .note {
          text-align: center;
          color: #98a2b3;
          font-size: 12px;
          margin-top: 25px;
        }

        /* -------------------------
           SECURITY / 504 PAGE
           ------------------------- */

        .securityPage {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px 16px;
          position: fixed;
          inset: 0;
          background: #f5f7fb;

          opacity: 0;
          visibility: hidden;

          animation:
            showSecurity 0s linear 30s forwards;
        }

        .loading {
          text-align: center;
          animation:
            hideLoading 0s linear 30s forwards;
        }

        .spinner {
          width: 55px;
          height: 55px;
          margin: 0 auto 20px;
          border: 5px solid #d9dee8;
          border-top-color: #3157c9;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading h2 {
          margin: 0 0 8px;
          font-size: 25px;
        }

        .loading p {
          margin: 0;
          color: #667085;
          font-size: 15px;
        }

        .warningCard {
          width: min(760px, 100%);
          background: #fff1a8;
          border: 2px solid #f0c419;
          border-radius: 22px;
          padding: 32px 23px;
          text-align: center;
          box-shadow: 0 12px 35px rgba(16, 24, 40, .12);
        }

        .warningIcon {
          width: 62px;
          height: 62px;
          margin: 0 auto 17px;
          border-radius: 50%;
          background: #ffe064;
          color: #c62828;
          display: grid;
          place-items: center;
          font-size: 32px;
          font-weight: 900;
        }

        .errorTitle {
          color: #c62828;
          font-size: clamp(26px, 7vw, 38px);
          margin: 0 0 13px;
        }

        .errorText {
          color: #b42318;
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
        }

        .path {
          margin-top: 20px;
          background: #fff9d6;
          border: 1px solid #dfc43a;
          border-radius: 12px;
          padding: 15px;
          text-align: left;
          color: #b42318;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          line-height: 1.55;
          overflow-wrap: anywhere;
        }

        .selected {
          color: #7f1d1d;
          font-size: 13px;
          font-weight: 700;
          margin-top: 17px;
        }

        .back {
          display: inline-block;
          margin-top: 20px;
          padding: 14px 22px;
          border-radius: 12px;
          background: #111827;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hideLoading {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes showSecurity {
          to {
            opacity: 1;
            visibility: visible;
          }
        }

        @media (max-width: 800px) {
          .plans {
            grid-template-columns: 1fr;
          }

          .page {
            padding: 28px 14px;
          }
        }
      `}</style>

      {/* PAYMENT PLANS */}

      <div className="container">
        <header className="header">
          <div className="label">
            Email & Domain Provider
          </div>

          <h1>
            Choose your payment plan
          </h1>

          <p className="subtitle">
            Working access to 5,000+ email providers in 189
            countries and 4 cards.
          </p>
        </header>

        <section className="plans">

          {/* STARTER */}

          <article className="card">
            <div className="name">
              Starter
            </div>

            <div className="price">
              $9.99 <small>/ month</small>
            </div>

            <div className="line" />

            <ul>
              <li>5,000 emails</li>
              <li>1 website</li>
              <li>HTTPS security</li>
              <li>SSL protocol</li>
              <li>Spam detector</li>
              <li>Instant reply</li>
            </ul>

            <a
              className="continue"
              href="#security"
            >
              Continue
            </a>
          </article>


          {/* BUSINESS */}

          <article className="card popular">
            <div className="badge">
              POPULAR
            </div>

            <div className="name">
              Business
            </div>

            <div className="price">
              $19.90 <small>/ month</small>
            </div>

            <div className="line" />

            <ul>
              <li>10,000 emails</li>
              <li>3 websites</li>
              <li>HTTPS security</li>
              <li>SSL protocol</li>
              <li>Spam detector</li>
              <li>Instant reply</li>
            </ul>

            <a
              className="continue"
              href="#security"
            >
              Continue
            </a>
          </article>


          {/* BUSINESS PLUS */}

          <article className="card">
            <div className="name">
              Business Plus
            </div>

            <div className="price">
              $49.90 <small>/ month</small>
            </div>

            <div className="line" />

            <ul>
              <li>50,000 emails</li>
              <li>10 websites</li>
              <li>HTTPS security</li>
              <li>SSL protocol</li>
              <li>Spam detector</li>
              <li>Instant reply</li>
              <li>10 forwarding emails</li>
              <li>Private reply with no-reply</li>
            </ul>

            <a
              className="continue"
              href="#security"
            >
              Continue
            </a>
          </article>

        </section>

        <p className="note">
          Secure payment • Cancel anytime • Change your plan anytime
        </p>
      </div>


      {/* 30 SECOND SECURITY SCREEN */}

      <section
        id="security"
        className="securityPage"
      >

        <div className="loading">

          <div className="spinner" />

          <h2>
            Checking access...
          </h2>

          <p>
            Please wait while our security service
            verifies your request.
          </p>

        </div>


        <div className="warningCard">

          <div className="warningIcon">
            !
          </div>

          <h2 className="errorTitle">
            Oops! 504 Error Occurred
          </h2>

          <p className="errorText">
            Access denied by our team security service.
            <br />
            You can only continue with the authorized
            source below.
          </p>

          <div className="path">
            github/matteorizzi/codes/api_mail__notifications@
            matteorizzi.com_172.186.0.0.0.1_file_Email notifications.tsx
          </div>

          <div className="selected">
            Security verification failed.
          </div>

          <a
            className="back"
            href="#"
          >
            ← Back to payment plans
          </a>

        </div>

      </section>

    </main>
  );
}