import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <a href="tel:+917985086681" className="footer-link">
            <FaPhoneAlt /> +91 7985086681
          </a>
          <a href="mailto:jatayusid004@gmail.com" className="footer-link">
            <IoMail /> jatayusid004@gmail.com
          </a>
        </div>

        <div className="footer-center">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Career</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-right">
          <a href="#" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="#" className="social-icon">
            <FaXTwitter />
          </a>
          <a href="#" className="social-icon">
            <FaYoutube />
          </a>
          <a href="#" className="social-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
