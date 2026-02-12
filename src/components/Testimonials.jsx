
import React from 'react';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: 'Aditi Rao', text: 'Best Chinese in Thane! The mocktails are so refreshing.', stars: 5 },
        { id: 2, name: 'Rahul K.', text: 'Love the street vibe. The Schezwan noodles are a must-try.', stars: 5 },
        { id: 3, name: 'Sneha P.', text: 'Great place for late night cravings. Fast service and tasty food.', stars: 4 },
    ];

    return (
        <section id="testimonials" className="section-padding bg-black">
            <div className="container">
                <h2 className="text-primary text-center">What Our Customers Say</h2>
                <div className="divider-center"></div>

                <div className="reviews-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="stars">
                                {'★'.repeat(review.stars)}
                            </div>
                            <p className="review-text">"{review.text}"</p>
                            <h4 className="reviewer-name">- {review.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .text-center { text-align: center; }
        .divider-center { margin: 10px auto 50px; }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .review-card {
          background-color: #111;
          padding: 30px;
          border: 1px solid #333;
          border-radius: 10px;
          text-align: center;
          transition: 0.3s;
        }
        
        .review-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-5px);
        }
        
        .stars {
          color: var(--color-primary);
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        
        .review-text {
          font-style: italic;
          color: #ccc;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        
        .reviewer-name {
          color: #fff;
          font-weight: 600;
        }
        
        @media (max-width: 992px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 576px) {
          .reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
};

export default Testimonials;
