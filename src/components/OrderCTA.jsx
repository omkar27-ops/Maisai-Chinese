
import React from 'react';

const OrderCTA = () => {
    return (
        <section id="order" className="section-padding bg-primary" style={{ color: 'var(--color-secondary)' }}>
            <div className="container text-center">
                <h2 className="cta-heading">Craving Maisai?</h2>
                <p className="cta-sub">Order your favourites now from your preferred platform.</p>

                <div className="cta-buttons">
                    <button className="btn-order">Zomato</button>
                    <button className="btn-order">Swiggy</button>
                </div>
            </div>
            <style>{`
        .text-center { text-align: center; }
        .cta-heading {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          margin-bottom: 15px;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .cta-sub {
          font-size: 1.2rem;
          margin-bottom: 40px;
          font-weight: 600;
        }
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .btn-order {
          background-color: var(--color-secondary);
          color: var(--color-primary);
          padding: 15px 40px;
          font-size: 1.2rem;
          border: 2px solid var(--color-secondary);
          transition: 0.3s;
        }
        .btn-order:hover {
          background-color: transparent;
          color: var(--color-secondary);
          transform: translateY(-5px);
        }
        
        @media (max-width: 576px) {
          .cta-heading { font-size: 2.5rem; }
          .cta-buttons { flexDirection: column; width: 100%; }
          .btn-order { width: 100%; }
        }
      `}</style>
        </section>
    );
};

export default OrderCTA;
