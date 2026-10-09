import { Link } from "react-router-dom";

function Terms() {
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
      <h1>Terms and Conditions</h1>
      <p>
        <strong>Last updated:</strong> October 9, 2026
      </p>
      <p>
        Welcome to NattyExpress. These Terms and Conditions govern your use of
        our website and the purchase of products through our platform. By
        accessing or using NattyExpress, you agree to these terms. If you do not
        agree, please discontinue using our website.
      </p>
      <h2>1. About NattyExpress</h2>
      <p>
        NattyExpress is an online shopping platform where customers can browse
        products, place orders, and make payments for available items. We
        reserve the right to improve, update, or modify our services as needed.
      </p>
      <h2>2. Customer Accounts</h2>
      <ul>
        <li>You must provide accurate information when registering.</li>
        <li>You are responsible for keeping your login credentials secure.</li>
        <li>
          You must notify us if you suspect unauthorized access to your account.
        </li>
        <li>
          You must not impersonate another person or misuse another customer's
          account.
        </li>
      </ul>
      <h2>3. Products and Availability</h2>
      <p>
        We make reasonable efforts to display accurate product descriptions,
        images, prices, and stock information. However, errors may occasionally
        occur. Product colours or appearances may differ slightly from images
        displayed on different screens.
      </p>
      <p>
        Products are subject to availability. We reserve the right to correct
        listing errors and discontinue products where necessary. If an error
        materially affects your order, we will take reasonable steps to notify
        you and explain the available options.
      </p>
      <h2>4. Prices and Payments</h2>
      <p>
        Product prices are displayed on the website and may change without prior
        notice. The price applicable to an order should be confirmed during
        checkout.
      </p>
      <p>
        Payments may be processed through third-party payment providers,
        including Paystack. You must provide accurate payment information and
        follow the payment provider's instructions. An order is not considered
        paid until payment has been successfully confirmed.
      </p>
      <h2>5. Orders and Confirmation</h2>
      <p>
        Placing an order constitutes a purchase request. We may need to verify
        payment, stock availability, and delivery details before processing the
        order. If an order cannot be fulfilled, we will take reasonable steps to
        notify you and arrange any refund due in accordance with applicable law
        and our refund process.
      </p>
      <h2>6. Delivery</h2>
      <p>
        Customers must provide accurate contact and delivery information.
        Delivery times may vary depending on location, product availability,
        courier operations, and circumstances beyond our control. Any delivery
        estimates provided are estimates unless expressly stated otherwise.
      </p>
      <p>
        If delivery details are incorrect or a delivery cannot be completed,
        additional arrangements may be necessary.
      </p>
      <h2>7. Cancellations, Returns, and Refunds</h2>
      <p>
        If you need to cancel an order, contact us as soon as possible. Whether
        cancellation is possible may depend on the order's processing and
        delivery status.
      </p>
      <p>
        If an item is defective, damaged, incorrect, or otherwise qualifies for
        a return or refund, contact us with your order details. Return,
        replacement, and refund requests will be handled according to our
        applicable policies and consumer protection obligations. Nothing in
        these terms removes rights that cannot legally be excluded.
      </p>
      <h2>8. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the website for fraudulent or unlawful activities.</li>
        <li>
          Attempt to access restricted accounts or administrative systems
          without authorization.
        </li>
        <li>Disrupt, damage, or interfere with the website or its services.</li>
        <li>
          Submit false information or abuse our feedback and support features.
        </li>
        <li>Copy or misuse website content in violation of applicable law.</li>
      </ul>
      <h2>9. Intellectual Property</h2>
      <p>
        Website content, branding, text, and design elements may be protected by
        intellectual property laws. You may not reproduce or commercially use
        protected content without permission, except where permitted by law.
        Product names, trademarks, and images belonging to third parties remain
        the property of their respective owners.
      </p>
      <h2>10. Third-Party Services</h2>
      <p>
        NattyExpress may rely on third-party services for payments, hosting,
        image storage, and other features. We are not responsible for
        independent third-party websites or services, but this does not limit
        any responsibility imposed on us by applicable law.
      </p>
      <h2>11. Limitation of Liability</h2>
      <p>
        To the extent permitted by applicable law, NattyExpress is not liable
        for indirect losses arising from temporary website interruptions,
        inaccurate information supplied by users, or events outside our
        reasonable control. These terms do not exclude liability that cannot
        legally be excluded or restricted.
      </p>
      <h2>12. Privacy</h2>
      <p>
        Our handling of personal information is explained in our{" "}
        <Link to="/privacy">Privacy Policy</Link>. By using our services, you
        acknowledge that your information may be handled as described there and
        as permitted by applicable law.
      </p>
      <h2>13. Changes to These Terms</h2>
      <p>
        We may update these Terms and Conditions when our services or legal
        requirements change. The updated version will be published on this page
        with a revised date. Changes will apply as permitted by law.
      </p>
      <h2>14. Governing Law</h2>
      <p>
        These terms are subject to applicable laws and regulations in Nigeria.
        Any dispute will be handled in accordance with applicable law.
      </p>
      <h2>15. Contact Us</h2>
      <p>
        If you have questions about these terms, please contact NattyExpress
        using the contact details published on our website.
      </p>
      <p>
        <Link to="/">Back to Home</Link>
        {" | "}
        <Link to="/privacy">Privacy Policy</Link>
        {" | "}
        <Link to="/feedback">Feedback & Suggestions</Link>
      </p>
    </main>
  );
}

export default Terms;
