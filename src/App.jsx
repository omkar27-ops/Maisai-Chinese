import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Ambience from './components/Ambience';
import SignatureDishes from './components/SignatureDishes';
import OrderCTA from './components/OrderCTA';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Ambience />
      <SignatureDishes />
      <OrderCTA />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
