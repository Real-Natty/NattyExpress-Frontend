import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Suggestion",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post("/feedback", formData);

      setSuccess(
        response.data.message || "Thank you! Your feedback has been submitted.",
      );

      setFormData({
        name: "",
        email: "",
        category: "Suggestion",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your feedback. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container feedback-page">
      <div
        style={{
          maxWidth: "650px",
          margin: "40px auto",
          padding: "25px",
          border: "1px solid #e5e5e5",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Feedback & Suggestions</h1>

        <p style={{ color: "#666", lineHeight: "1.7" }}>
          Your opinion matters to us. Share your suggestions, ask questions, or
          tell us how we can improve your NattyExpress shopping experience.
        </p>
        {success && (
          <p
            role="status"
            style={{
              background: "#e8f7ed",
              color: "#18743a",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            {success}
          </p>
        )}
        {error && (
          <p
            role="alert"
            style={{
              background: "#fdecec",
              color: "#b42318",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            maxLength={100}
            required
            style={inputStyle}
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            maxLength={254}
            required
            style={inputStyle}
          />

          <label htmlFor="category">Feedback Type</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Suggestion">Suggestion</option>
            <option value="Complaint">Complaint</option>
            <option value="Question">Question</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your feedback here..."
            rows={6}
            maxLength={3000}
            required
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <p style={{ fontSize: "12px", color: "#777" }}>
            {formData.message.length}/3000 characters
          </p>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#ff6b1a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
};

export default Feedback;
