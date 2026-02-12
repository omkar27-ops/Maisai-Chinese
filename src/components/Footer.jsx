
import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="footer-section">
            <div className="footer-top-border"></div>
            <div className="container">

                <div className="footer-content">
                    <div className="visit-us">
                        <h2 className="text-primary mb-4">Visit Us</h2>
                        <div className="contact-details">
                            <p><strong>Address:</strong><br /> Madhvi Chowk, near Rosa Manhattan,<br /> Hiranandani Estate, Thane West, Maharashtra 400615</p>
                            <p><strong>Hours:</strong><br /> 12:00 PM – 11:30 PM</p>
                            <p><strong>Contact:</strong><br /> +91 1234567890</p>
                        </div>
                    </div>

                    <div className="map-placeholder">
                        <div className="map-frame">
                            <span>Google Maps Placeholder</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <h3 className="footer-logo">Maisai Chinese & Mocktail Boba</h3>
                    <div className="social-links">
                        <span>Instragram</span>
                        <span>Facebook</span>
                        <span>Zomato</span>
                    </div>
                    <p className="copyright">&copy; {new Date().getFullYear()} Maisai Chinese. All rights reserved.</p>
                </div>
            </div>
            <style>{`
        .footer-section {
          background-color: #000;
          color: #fff;
          padding-top: 0;
        }
        .footer-top-border {
          height: 5px;
          background-color: var(--color-primary);
          width: 100%;
        }
        .footer-content {
          padding: 60px 0;
          display: flex;
          justify-content: space-between;
          gap: 50px;
          flex-wrap: wrap;
        }
        .visit-us {
          flex: 1;
          min-width: 300px;
        }
        .mb-4 { margin-bottom: 1.5rem; }
        .contact-details p {
          margin-bottom: 20px;
          color: #ccc;
          line-height: 1.6;
        }
        .contact-details strong {
          color: #fff;
          font-family: var(--font-heading);
          letter-spacing: 1px;
        }
        
        .map-placeholder {
          flex: 1;
          min-width: 300px;
        }
        .map-frame {
          width: 100%;
          height: 300px;
          background-color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          border: 1px solid #333;
        }
        
        .footer-bottom {
          border-top: 1px solid #333;
          padding: 30px 0;
          text-align: center;
        }
        .footer-logo {
          color: var(--color-primary);
          margin-bottom: 20px;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          color: #aaa;
          text-transform: uppercase;
          font-size: 0.9rem;
        }
        .copyright {
          color: #666;
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 30px;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
