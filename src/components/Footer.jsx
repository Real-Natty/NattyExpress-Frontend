import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {" "}
      <div className="footer-container">
        {" "}
        <div className="footer-section footer-about">
          {" "}
          <h2>NattyExpress</h2>{" "}
          <p>
            Your trusted online store for quality gadgets and everyday
            essentials. Shop conveniently, discover great products, and enjoy a
            better shopping experience.{" "}
          </p>{" "}
        </div>
        <section className="footer-section">
          <h3>Contact Us</h3>

          <ul className="footer-socials">
            <li>
              <a
                href="https://wa.me/2349168022034"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="social-icon whatsapp-icon" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/share/19eDhi8jx7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="social-icon facebook-icon" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/odogwu_natty?cplk=cW5sbHgwbTd3NTI="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="social-icon instagram-icon" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@celebrity_boyfriend02"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="social-icon tiktok-icon" />
                <span>TikTok</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/eluagu_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="social-icon x-icon" />
                <span>X (Twitter)</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@Celebrity-boyfriend01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="social-icon youtube-icon" />
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a href="mailto:eluaguchubuike21@gmail.com">
                <FaEnvelope className="social-icon email-icon" />
                <span>Email Us</span>
              </a>
            </li>
          </ul>
        </section>
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li>
              <Link to="/faqs">Frequently Asked Questions</Link>
            </li>
            <li>
              <Link to="/">Browse Products</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback &amp; Suggestions</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} NattyExpress. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
