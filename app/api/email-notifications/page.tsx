"use client";

import { useEffect, useState } from "react";

type Plan = "starter" | "business" | "business-pro";

export default function EmailNotificationsPage() {
  const [opening, setOpening] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpening(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = (plan: Plan) => {
    if (processing) return;

    setSelectedPlan(plan);
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setAccessDenied(true);
    }, 30000);
  };

  const handleBack = () => {
    setAccessDenied(false);
    setSelectedPlan(null);
  };

  /* OPENING 30 SECOND LOADER */
  if (opening) {
    return (
      <main className="payment-page">
        <div className="payment-opening-loader">
          <div className="payment-loader-content">
            <div className="payment-loader-logo">MR</div>

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

  /* PROCESSING 30 SECOND LOADER */
  if (processing) {
    return (
      <main className="payment-page">
        <div className="payment-opening-loader payment-processing-loader">
          <div className="payment-loader-content">
            <div className="payment-loader-logo">MR</div>

            <div className="payment-loader-title">
              Processing your request
            </div>

            <div className="payment-loader-status">
              Secure payment access is being prepared...
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

  /* PAYMENT / SECURITY ERROR */
  if (accessDenied) {
    return (
      <main className="payment-page">
        <section className="access-denied-page">
          <div className="access-denied-card">

            <div className="error-code">
              PAYMENT REQUEST
            </div>

            <div className="error-icon">
              !
            </div>

            <h1>
              We couldn&apos;t process your request
            </h1>

            <p className="error-main-text">
              We cannot proceed to the next stage because
              this payment request was made from an
              unauthorized device or account.
            </p>

            <p className="error-secondary-text">
              For security reasons, payment access is only
              available through an authorized device or
              account associated with this service.
            </p>

            <div className="authorized-access">
              <div className="authorized-label">
                What you can do
              </div>

              <div className="authorized-path">
                Please try again using an authorized device
                or account. If you believe this is an error,
                contact your system developer or administrator
                for assistance.
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

  /* PAYMENT PLANS */
  return (
    <main className="payment-page">
      <section className="payment-content">

        <div className="payment-heading">
          <h1>Choose your payment plan</h1>

          <p>
            Working access to 5,000+ email providers
            in 189 countries and 4 cards.
          </p>
        </div>

        {/* STARTER */}
        <article className="payment-card">
          <h2>Starter</h2>

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

        {/* BUSINESS */}
        <article className="payment-card popular-card">

          <div className="popular-badge">
            POPULAR
          </div>

          <h2>Business</h2>

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

        {/* BUSINESS PRO */}
        <article className="payment-card">

          <h2>Business Pro</h2>

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