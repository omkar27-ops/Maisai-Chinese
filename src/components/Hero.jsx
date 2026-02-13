
import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]); // Use ref for images to avoid re-renders
  const [loading, setLoading] = useState(true);

  // Configuration
  const frameCount = 232;
  const imagesPath = '/Toss-WebP'; // WebP images

  // Format: ezgif-frame-XXX.webp
  const currentFrame = (index) => (
    `${imagesPath}/ezgif-frame-${index.toString().padStart(3, '0')}.webp`
  );


  // Preload images with progressive loading
  useEffect(() => {
    // Initialize ref array
    imagesRef.current = new Array(frameCount).fill(null);

    const loadFrame = (index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = currentFrame(index);
        img.onload = () => {
          imagesRef.current[index - 1] = img; // Store in ref (0-indexed)
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          resolve(); // Resolve to adhere to Promise.all
        };
      });
    };

    const loadImages = async () => {
      // Priority: Load first 30 frames for immediate playback
      const priorityCount = 30;
      const priorityPromises = [];
      for (let i = 1; i <= priorityCount; i++) {
        priorityPromises.push(loadFrame(i));
      }

      await Promise.all(priorityPromises);
      setLoading(false); // Enable interaction as soon as intro is ready

      // Background: Load the rest in chunks
      const chunkSize = 20;
      for (let i = priorityCount + 1; i <= frameCount; i += chunkSize) {
        const chunkPromises = [];
        // Create a chunk of promises
        for (let j = i; j < i + chunkSize && j <= frameCount; j++) {
          chunkPromises.push(loadFrame(j));
        }
        // Wait for chunk to load before starting next chunk (gentle on network)
        await Promise.all(chunkPromises);
      }
    };

    loadImages();

    // Cleanup not strictly necessary for simple image loading, but good practice
    return () => {
      imagesRef.current = [];
    };

  }, []);

  // Update canvas on scroll
  // Update canvas on scroll
  useEffect(() => {
    // Only wait for loading to complete (priority batch). 
    // imagesRef will be populated incrementally, but that's fine.
    if (loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = (index) => {
      if (index >= 0 && index < frameCount) {
        const img = imagesRef.current[index]; // Use ref
        if (!img) return; // Safety check

        // "Cover" fit logic for canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const stickyTop = container.offsetTop;
      const scrollPosition = window.scrollY - stickyTop;
      const containerHeight = container.offsetHeight - window.innerHeight; // scrollable distance

      if (containerHeight <= 0) return;

      let scrollFraction = scrollPosition / containerHeight;

      // Clamp 0 to 1
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => render(frameIndex));

      // Handle Text Opacity based on frames
      const text1 = document.getElementById('hero-text-1');
      const text2 = document.getElementById('hero-text-2');
      const text3 = document.getElementById('hero-text-3');

      // Text 1: Visible 0-30%
      if (scrollFraction < 0.3) {
        if (text1) {
          text1.style.opacity = 1 - (scrollFraction / 0.3);
          text1.style.transform = `translate(-50%, -50%) scale(${1 + scrollFraction})`;
        }
      } else {
        if (text1) text1.style.opacity = 0;
      }

      // Text 2: Visible 40-70%
      if (scrollFraction > 0.4 && scrollFraction < 0.7) {
        if (text2) {
          // Fade in 0.4-0.5, Fade out 0.6-0.7
          if (scrollFraction < 0.5) {
            text2.style.opacity = (scrollFraction - 0.4) * 10;
          } else if (scrollFraction > 0.6) {
            text2.style.opacity = 1 - (scrollFraction - 0.6) * 10;
          } else {
            text2.style.opacity = 1;
          }
        }
      } else {
        if (text2) text2.style.opacity = 0;
      }

      // Text 3: Visible 80-100%
      if (scrollFraction > 0.8) {
        if (text3) {
          text3.style.opacity = (scrollFraction - 0.8) * 5;
          text3.style.pointerEvents = 'auto'; // Enable buttons
        }
      } else {
        if (text3) {
          text3.style.opacity = 0;
          text3.style.pointerEvents = 'none'; // Disable buttons when not visible
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => render(0)); // Re-render on resize

    // Initial render
    render(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => render(0));
    };
  }, [loading]); // Only re-run when loading completes

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative', backgroundColor: '#000' }}>
      <div className="sticky-wrapper">
        <canvas ref={canvasRef} id="hero-canvas" />

        {/* Loading State */}
        {loading && (
          <div className="loader">
            <h1>Loading Experience...</h1>
          </div>
        )}

        <div className="hero-overlay-gradient"></div>

        {/* Text 1: Intro */}
        <div id="hero-text-1" className="hero-text centered">
          <h1 className="hero-title">Experience The <span className="text-primary fire-text">Fire</span></h1>
          <p className="hero-subtitle">Authentic Chinese Logic</p>
        </div>

        {/* Text 2: Action */}
        <div id="hero-text-2" className="hero-text centered">
          <h2 className="action-title">Wok Tossed <br /> Perfection</h2>
        </div>

        {/* Text 3: Call to Action */}
        <div id="hero-text-3" className="hero-text centered hero-final">
          <h1 className="hero-title">Maisai Chinese</h1>
          <p className="hero-subtitle">Mocktails & Boba</p>
          <div className="hero-buttons">
            <a href="#signature" className="btn-primary">View Menu</a>
            <a href="#order" className="btn-secondary">Order Now</a>
          </div>
          <div className="scroll-indicator-end">
            <span>↓ Scrolled to Content</span>
          </div>
        </div>

        {/* Initial Scroll Indicator */}
        <div className="initial-scroll-indicator">
          <span>Scroll to Explore ↓</span>
        </div>

      </div>

      <style>{`
        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        #hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-overlay-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8));
            pointer-events: none;
        }
        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--color-primary);
            font-family: var(--font-heading);
            z-index: 20;
        }
        .hero-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); /* Start centered */
            text-align: center;
            width: 100%;
            transition: opacity 0.2s ease-out;
            opacity: 1; /* Initial state */
            pointer-events: none;
            z-index: 10;
        }
        /* Override transform for JS manipulation */
        #hero-text-1 { opacity: 1; }
        #hero-text-2 { opacity: 0; }
        #hero-text-3 { opacity: 0; }

        .hero-title {
            font-family: var(--font-hero);
            font-size: 5rem;
            color: #fff;
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
         .action-title {
            font-family: var(--font-heading);
            font-size: 6rem;
            color: var(--color-primary);
            text-transform: uppercase;
            line-height: 1;
            text-shadow: 0 4px 10px rgba(0,0,0,0.8);
        }
        .hero-subtitle {
            font-size: 1.5rem;
            color: #ccc;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 10px;
        }
        .fire-text {
            color: #ff4d4d; /* Reddish for fire */
            text-shadow: 0 0 10px #ff4d4d;
        }
        
        .hero-buttons {
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
            pointer-events: auto; /* Re-enable pointer events for buttons */
        }
        
        .initial-scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            animation: bounce 2s infinite;
            opacity: 0.8;
            z-index: 5;
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 3rem; }
            .action-title { font-size: 4rem; }
            .hero-subtitle { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
