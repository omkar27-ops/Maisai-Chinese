
import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Configuration
  const frameCount = 192;
  const imagesPath = '/Noodle Toss Optimized'; // Use optimized images

  // Pad numbers with leading zeros (e.g., 1 -> 00001)
  const currentFrame = (index) => (
    `${imagesPath}/${index.toString().padStart(5, '0')}.jpg`
  );

  // Preload images with progressive loading
  useEffect(() => {
    let loadedCount = 0;
    const imgArray = [];
    const frameStride = 4; // Aggressive optimization: Load every 4th frame
    const effectiveTotal = Math.ceil(frameCount / frameStride);

    // Function to handle load
    const onLoad = () => {
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / effectiveTotal) * 100));
      if (loadedCount >= effectiveTotal) {
        setIsLoaded(true);
      }
    };

    // 1. Load the first frame immediately
    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      onLoad();
    };
    imgArray[0] = firstImg;

    // 2. Load the rest in background with stride
    for (let i = 1 + frameStride; i <= frameCount; i += frameStride) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = onLoad;
      imgArray[i - 1] = img;
    }

    setImages(imgArray);
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    // Only block if we don't even have the first image
    if (images.length === 0 || !images[0].complete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = (index) => {
      // Fallback: If frame not loaded yet, try to find closest loaded frame
      let img = images[index];
      if (!img || !img.complete) {
        // Find closest previous loaded frame
        for (let i = index - 1; i >= 0; i--) {
          if (images[i] && images[i].complete) {
            img = images[i];
            break;
          }
        }
        // If no previous, try next (rare case if random loading)
        if (!img || !img.complete) {
          for (let i = index + 1; i < frameCount; i++) {
            if (images[i] && images[i].complete) {
              img = images[i];
              break;
            }
          }
        }
      }

      if (img && img.complete) {
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
        text1.style.opacity = 1 - (scrollFraction / 0.3);
        text1.style.transform = `translate(-50%, -50%) scale(${1 + scrollFraction})`;
      } else {
        text1.style.opacity = 0;
      }

      // Text 2: Visible 40-70%
      if (scrollFraction > 0.4 && scrollFraction < 0.7) {
        // Fade in 0.4-0.5, Fade out 0.6-0.7
        if (scrollFraction < 0.5) {
          text2.style.opacity = (scrollFraction - 0.4) * 10;
        } else if (scrollFraction > 0.6) {
          text2.style.opacity = 1 - (scrollFraction - 0.6) * 10;
        } else {
          text2.style.opacity = 1;
        }
      } else {
        text2.style.opacity = 0;
      }

      // Text 3: Visible 80-100%
      if (scrollFraction > 0.8) {
        text3.style.opacity = (scrollFraction - 0.8) * 5;
        text3.style.pointerEvents = 'auto'; // Enable buttons
      } else {
        text3.style.opacity = 0;
        text3.style.pointerEvents = 'none'; // Disable buttons when not visible
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => render(0)); // Re-render on resize

    // Initial render attempt (will try 0, or first loaded)
    render(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => render(0));
    };
  }, [images]); // Re-bind when images array updates (though mutations might not trigger, state setImages does)

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative', backgroundColor: '#000' }}>
      <div className="sticky-wrapper">
        <canvas ref={canvasRef} id="hero-canvas" />

        {/* Loading Indicator (Small, non-blocking) */}
        {!isLoaded && (
          <div className="loader-small">
            <span>Loading Experience... {loadingProgress}%</span>
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
        .loader-small {
            position: absolute;
            top: 20px;
            right: 20px;
            color: rgba(255, 255, 255, 0.5);
            font-family: var(--font-body);
            font-size: 0.8rem;
            z-index: 20;
            background: rgba(0,0,0,0.5);
            padding: 5px 10px;
            border-radius: 4px;
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
