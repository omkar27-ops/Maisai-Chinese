
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
                <a href="#" className="logo">Maisai Chinese</a>

                <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
                    <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="#ambience" onClick={() => setMobileMenuOpen(false)}>Ambience</a>
                    <a href="#signature" onClick={() => setMobileMenuOpen(false)}>Signature Dishes</a>
                    <a href="#order" onClick={() => setMobileMenuOpen(false)}>Order</a>
                    <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>

                <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
            <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
        }
        .navbar.scrolled {
          background: var(--color-secondary);
          padding: 15px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--color-primary);
          text-transform: uppercase;
        }
        .nav-links a {
          margin-left: 20px;
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: uppercase;
        }
        .nav-links a:hover {
          color: var(--color-primary);
        }
        .mobile-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }
        .bar {
          width: 25px;
          height: 3px;
          background-color: var(--color-accent);
          margin: 4px 0;
          transition: 0.3s;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 60px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 60px);
            background: var(--color-secondary);
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
          }
          .nav-links.active {
            right: 0;
          }
          .nav-links a {
            margin: 15px 0;
            font-size: 1.2rem;
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
