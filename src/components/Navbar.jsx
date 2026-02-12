
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo">Maisai <span className="text-primary">Chinese</span></a>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#ambience" onClick={() => setMobileMenuOpen(false)}>Ambience</a>
          <a href="#signature" onClick={() => setMobileMenuOpen(false)}>Signature Dishes</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#order" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>Order Now</a>
        </div>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 25px 0;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 208, 0, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          z-index: 1001;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .nav-links a {
          font-weight: 500;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          color: #fff;
          padding: 5px 0;
        }
        /* Animated Underline Effect */
        .nav-links a:not(.nav-btn)::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--color-primary);
          transition: width 0.3s ease;
        }
        .nav-links a:not(.nav-btn):hover {
          color: var(--color-primary);
        }
        .nav-links a:not(.nav-btn):hover::after {
          width: 100%;
        }

        /* Order Button in Nav description */
        .nav-btn {
          background-color: var(--color-primary);
          color: #000 !important;
          padding: 8px 24px !important;
          font-weight: 700 !important;
          clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 208, 0, 0.4);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          z-index: 1001;
          gap: 6px;
        }
        .bar {
          width: 30px;
          height: 3px;
          background-color: var(--color-primary);
          transition: 0.3s;
          border-radius: 2px;
        }
        /* Hamburger Animation */
        .bar.open:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
        .bar.open:nth-child(2) { opacity: 0; }
        .bar.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -8px); }
        
        @media (max-width: 992px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.4s ease-in-out;
            gap: 40px;
          }
          .nav-links.active {
            transform: translateY(0);
          }
          .nav-links a {
            font-size: 1.5rem;
          }
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
