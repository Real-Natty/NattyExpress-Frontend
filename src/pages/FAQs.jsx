import { Link } from "react-router-dom";

function FAQs() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, select the item you want, add it to your cart, and proceed to checkout to complete your order.",
    },
    {
      question: "Do I need an account to place an order?",
      answer:
        "Yes. You must log in or create an account before completing your order.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "Available payment options are displayed during checkout. Follow the instructions provided to complete your payment.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Log in to your account and visit My Orders to check your order status.",
    },
    {
      question: "What should I do if I have a problem with my order?",
      answer:
        "Contact us through our available contact channels or submit your concern through the Feedback and Suggestions page.",
    },
    {
      question: "How can I contact NattyExpress?",
      answer:
        "Visit the contact section in our footer to access our available communication channels.",
    },
  ];

  return (
    <main
      className="container"
      style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}
    >
      {" "}
      <h1>Frequently Asked Questions</h1>{" "}
      <p>Find answers to common questions about shopping on NattyExpress.</p>
      ```
      {faqs.map((faq, index) => (
        <details
          key={index}
          style={{
            padding: "18px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
            {faq.question}
          </summary>
          <p style={{ lineHeight: "1.7", marginTop: "12px" }}>{faq.answer}</p>
        </details>
      ))}
      <p style={{ marginTop: "25px" }}>
        Still need help? <Link to="/feedback">Contact us or send feedback</Link>
        .
      </p>
    </main>
  );
}

export default FAQs;
