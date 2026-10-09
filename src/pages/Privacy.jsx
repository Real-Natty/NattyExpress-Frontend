import { Link } from "react-router-dom";

function Privacy() {
  return (
    <main
      className="container"
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "25px",
        lineHeight: "1.8",
      }}
    >
      {" "}
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> October 9, 2026
      </p>
      <p>
        At NattyExpress, we respect your privacy and are committed to protecting
        the personal information you share with us when using our website.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        When you use NattyExpress, we may collect information such as your name,
        email address, phone number, delivery address, account details, order
        information, and feedback you submit to us.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Process orders and arrange deliveries.</li>
        <li>Process payments through our payment providers.</li>
        <li>Provide customer support and respond to feedback.</li>
        <li>Improve our website, products, and services.</li>
        <li>Protect our website against fraud and unauthorized activity.</li>
      </ul>
      <h2>3. Payments</h2>
      <p>
        Payments may be processed through third-party payment providers such as
        Paystack. Payment information submitted through their payment services
        is handled according to their applicable privacy and security practices.
        NattyExpress does not intend to store your full card number or card
        security code on its own servers.
      </p>
      <h2>4. Sharing Your Information</h2>
      <p>
        We do not sell your personal information. We may share necessary
        information with service providers who help us operate our website,
        process payments, deliver orders, or provide technical services.
        Information may also be disclosed when required by applicable law.
      </p>
      <h2>5. Cookies and Website Storage</h2>
      <p>
        Our website may use cookies, browser storage, or similar technologies to
        maintain your session, support shopping cart functionality, and improve
        your experience. You can manage certain storage and cookie settings
        through your browser.
      </p>
      <h2>6. Data Security</h2>
      <p>
        We take reasonable measures to protect personal information from
        unauthorized access, loss, misuse, or disclosure. However, no method of
        electronic storage or internet transmission can be guaranteed to be
        completely secure.
      </p>
      <h2>7. Data Retention</h2>
      <p>
        We retain personal information for as long as reasonably necessary to
        provide our services, maintain relevant records, resolve disputes, and
        meet applicable legal obligations.
      </p>
      <h2>8. Your Privacy Rights</h2>
      <p>
        Depending on applicable law, you may have the right to request access to
        your personal information, correct inaccurate information, request
        deletion, or raise concerns about how your information is handled. Some
        information may need to be retained where the law requires it.
      </p>
      <h2>9. Third-Party Services</h2>
      <p>
        Our website may use external services for payments, image hosting,
        authentication, or website hosting. Those services may process
        information according to their own privacy policies.
      </p>
      <h2>10. Children's Privacy</h2>
      <p>
        NattyExpress is not intended to knowingly collect personal information
        from children in violation of applicable privacy laws. A parent or
        guardian who believes a child has provided personal information may
        contact us to discuss the matter.
      </p>
      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy as our services or legal requirements
        change. Updates will be published on this page with a revised date.
      </p>
      <h2>12. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your information
        is handled, contact NattyExpress through the contact details published
        on our website.
      </p>
      <p>
        <Link to="/">Back to Home</Link>
        {" | "}
        <Link to="/terms">Terms & Conditions</Link>
        {" | "}
        <Link to="/feedback">Feedback & Suggestions</Link>
      </p>
    </main>
  );
}

export default Privacy;
