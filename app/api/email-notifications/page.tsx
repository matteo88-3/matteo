"use client";

import { useEffect, useState } from "react";

type Plan = "starter" | "business" | "business-pro";

export default function EmailNotificationsPage() {
  const [opening, setOpening] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  /*
   * =========================================
   * 30 SECOND OPENING LOADER
   * =========================================
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpening(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  /*
   * =========================================
   * CONTINUE BUTTON
   * 30 SECOND PROCESSING
   * =========================================
   */
  const handleContinue = (plan: Plan) => {
    if (processing) return;

    setSelectedPlan(plan);
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setAccessDenied(true);
    }, 30000);
  };

  /*
   * =========================================
   * RETURN TO PAYMENT PLANS
   * =========================================
   */
  const handleBack = () => {
    setAccessDenied(false);
    setSelectedPlan(null);
  };

  /*
   * =========================================
   * OPENING SCREEN
   * =========================================
   */
  if (opening) {
    return (
      <main className="payment-page">

        <div className="payment-opening-loader">
          <div className="payment-loader-content">

            <div className="payment-loader-logo">
              MR
            </div>

            <div className="payment-loader-title">
              Matteo Rizzi
            </div>

            <div className="payment-loader-status">
              Preparing secure access...
            </div>

            <div className="payment-loader-bar">
              <div className="payment-loader-progress" />
            </div>

            <div className="payment-loader-time">
              Please wait...
            </div>

          </div>
        </div>

      </main>
    );
  }

  /*
   * =========================================
   * 30 SECOND PROCESSING SCREEN
   * =========================================
   */
  if (processing) {
    return (
      <main className="payment-page">

        <div className="payment-opening-loader payment-processing-loader">
          <div className="payment-loader-content">

            <div className="payment-loader-logo">
              MR
            </div>

            <div className="payment-loader-title">
              Processing your request
            </div>

            <div className="payment-loader-status">
              Secure access is being prepared...
            </div>

            <div className="payment-loader-bar">
              <div className="payment-loader-progress" />
            </div>

            <div className="payment-loader-time">
              Please wait while we process your request...
            </div>

            {selectedPlan && (
              <div className="processing-plan">
                {selectedPlan === "starter" && "Starter plan"}
                {selectedPlan === "business" && "Business plan"}
                {selectedPlan === "business-pro" && "Business Pro plan"}
              </div>
            )}

          </div>
        </div>

      </main>
    );
  }

  /*
   * =========================================
   * 504 ACCESS DENIED SCREEN
   * =========================================
   */
  if (accessDenied) {
    return (
      <main className="payment-page">

        <section className="access-denied-page">

          <div className="access-denied-card">

            <div className="error-code">
              504
            </div>

            <div className="error-icon">
              !
            </div>

            <h1>
              Oops! 504 Error Occurred
            </h1>

            <p className="error-main-text">
              Access denied by our team security service.
            </p>

            <p className="error-secondary-text">
              You can only continue with the authorized
              email notification service.
            </p>

            <div className="authorized-access">

              <div className="authorized-label">
                Authorized access
              </div>

              <div className="authorized-path">
                github/matteorizzi/codes/
                <br />
                api_mail__notifications@
                <br />
                matteorizzi.com_172.186.0.0.0.1_file_
                <br />
                Email notifications.tsx
              </div>

            </div>

            <button
              type="button"
              className="security-button"
              onClick={handleBack}
            >
              Return to payment plans
            </button>

          </div>

        </section>

      </main>
    );
  }

  /*
   * =========================================
   * PAYMENT PLANS
   * =========================================
   */
  return (
    <main className="payment-page">

      <section className="payment-content">

        <div className="payment-heading">

          <h1>
            Choose your payment plan
          </h1>

          <p>
            Working access to 5,000+ email providers
            in 189 countries and 4 cards.
          </p>

        </div>


        {/* =====================================
            STARTER
            ===================================== */}

        <article className="payment-card">

          <h2>
            Starter
          </h2>

          <div className="price">
            $9.99
            <span>/month</span>
          </div>

          <div className="plan-divider" />

          <ul className="plan-features">

            <li>
              <span>✓</span>
              5,000 emails
            </li>

            <li>
              <span>✓</span>
              1 website
            </li>

            <li>
              <span>✓</span>
              HTTPS security
            </li>

            <li>
              <span>✓</span>
              SSL protocol
            </li>

            <li>
              <span>✓</span>
              Spam detector
            </li>

            <li>
              <span>✓</span>
              Instant reply
            </li>

          </ul>

          <button
            type="button"
            className="continue-button"
            onClick={() => handleContinue("starter")}
            disabled={processing}
          >
            Continue
          </button>

        </article>


        {/* =====================================
            BUSINESS
            ===================================== */}

        <article className="payment-card popular-card">

          <div className="popular-badge">
            POPULAR
          </div>

          <h2>
            Business
          </h2>

          <div className="price">
            $19.90
            <span>/month</span>
          </div>

          <div className="plan-divider" />

          <ul className="plan-features">

            <li>
              <span>✓</span>
              10,000 emails
            </li>

            <li>
              <span>✓</span>
              3 websites
            </li>

            <li>
              <span>✓</span>
              HTTPS security
            </li>

            <li>
              <span>✓</span>
              SSL protocol
            </li>

            <li>
              <span>✓</span>
              Spam detector
            </li>

            <li>
              <span>✓</span>
              Instant reply
            </li>

          </ul>

          <button
            type="button"
            className="continue-button"
            onClick={() => handleContinue("business")}
            disabled={processing}
          >
            Continue
          </button>

        </article>


        {/* =====================================
            BUSINESS PRO
            ===================================== */}

        <article className="payment-card">

          <h2>
            Business Pro
          </h2>

          <div className="price">
            $49.90
            <span>/month</span>
          </div>

          <div className="plan-divider" />

          <ul className="plan-features">

            <li>
              <span>✓</span>
              50,000 emails
            </li>

            <li>
              <span>✓</span>
              10 websites
            </li>

            <li>
              <span>✓</span>
              HTTPS security
            </li>

            <li>
              <span>✓</span>
              SSL protocol
            </li>

            <li>
              <span>✓</span>
              Spam detector
            </li>

            <li>
              <span>✓</span>
              Instant reply
            </li>

            <li>
              <span>✓</span>
              10 forwarding emails
            </li>

            <li>
              <span>✓</span>
              Private reply with no-reply
            </li>

          </ul>

          <button
            type="button"
            className="continue-button"
            onClick={() => handleContinue("business-pro")}
            disabled={processing}
          >
            Continue
          </button>

        </article>

      </section>

    </main>
  );
}