
import React from 'react';

const Ambience = () => {
    const images = [
        { id: 1, title: 'Interior', color: '#333' },
        { id: 2, title: 'Seating', color: '#444' },
        { id: 3, title: 'Food Counter', color: '#555' },
        { id: 4, title: 'Food Truck', color: '#222' },
        { id: 5, title: 'Night Vibe', color: '#666' },
    ];

    return (
        <section id="ambience" className="section-padding" style={{ background: '#0a0a0a' }}>
            <div className="container">
                <div className="header-center">
                    <h2 className="text-primary">Ambience & Experience</h2>
                    <p className="subtitle">Step into a vibrant space where street flavors meet modern comfort.</p>
                </div>

                <div className="gallery-grid">
                    {images.map((img) => (
                        <div key={img.id} className="gallery-item" style={{ backgroundColor: img.color }}>
                            <div className="placeholder-content">
                                <span>{img.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .header-center {
          text-align: center;
          margin-bottom: 60px;
        }
        .subtitle {
          color: #aaa;
          margin-top: 10px;
          font-size: 1.1rem;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 columns for desktop */
          grid-template-rows: repeat(2, 250px);
          gap: 20px;
        }
        /* Make the first image span 2 columns and 2 rows for a featured look */
        .gallery-item:nth-child(1) {
          grid-column: span 2;
          grid-row: span 2;
        }
        
        .gallery-item {
          border-radius: 15px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #333;
        }
        .gallery-item:hover {
          transform: scale(1.02);
          z-index: 10;
        }
        .placeholder-content {
          color: #fff;
          font-family: var(--font-heading);
          opacity: 0.5;
          font-size: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          .gallery-item:nth-child(1) {
            grid-column: span 2;
            height: 300px;
          }
          .gallery-item {
            height: 200px;
          }
        }
        
        @media (max-width: 576px) {
          .gallery-grid {
            display: flex;
            flex-direction: column;
          }
           .gallery-item:nth-child(1) {
            height: 250px;
          }
        }
      `}</style>
        </section>
    );
};

export default Ambience;
