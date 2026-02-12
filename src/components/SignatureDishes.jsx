
import React from 'react';

const SignatureDishes = () => {
    const dishes = [
        { id: 1, name: 'Spicy Schezwan Noodles', desc: 'Wok-tossed hakka noodles in our secret fiery sauce.' },
        { id: 2, name: 'Manchurian Dry', desc: 'Crispy veg balls tossed in tangy soya-garlic glaze.' },
        { id: 3, name: 'Paneer Chilli', desc: 'Soft paneer cubes stir-fried with peppers and green chillies.' },
        { id: 4, name: 'Classic Boba Tea', desc: 'Creamy milk tea with chewy tapioca pearls.' },
    ];

    return (
        <section id="signature" className="section-padding" style={{ background: '#050505' }}>
            <div className="container">
                <h2 className="text-primary text-center">Signature Dishes</h2>
                <div className="divider-center"></div>

                <div className="dish-scroll-container">
                    <div className="dish-grid">
                        {dishes.map((dish) => (
                            <div key={dish.id} className="dish-card">
                                <div className="dish-image-placeholder"></div>
                                <div className="dish-info">
                                    <h3>{dish.name}</h3>
                                    <div className="yellow-underline"></div>
                                    <p>{dish.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
        .text-center { text-align: center; }
        .divider-center {
          width: 80px;
          height: 3px;
          background-color: var(--color-primary);
          margin: 10px auto 50px;
        }
        
        .dish-grid {
          display: flex;
          gap: 30px;
          padding-bottom: 20px; /* Space for scrollbar if visible/needed */
        }
        
        .dish-card {
          flex: 0 0 300px; /* Fixed width for cards to enable scrolling behavior if needed */
          background-color: #111;
          border-radius: 8px; /* Slight rounded corners */
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #222;
        }
        
        .dish-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
          border-color: var(--color-primary);
        }
        
        .dish-image-placeholder {
          height: 200px;
          background-color: #222;
          width: 100%;
        }
        
        .dish-info {
          padding: 20px;
        }
        
        .dish-info h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #fff;
        }
        
        .yellow-underline {
          width: 40px;
          height: 2px;
          background-color: var(--color-primary);
          margin-bottom: 15px;
        }
        
        .dish-info p {
          color: #bbb;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        /* Responsive scroll for mobile */
        @media (max-width: 992px) {
           .dish-scroll-container {
             overflow-x: auto;
             padding: 0 20px;
             margin: 0 -20px; /* Negative margin to let scroll go edge to edge */
             -webkit-overflow-scrolling: touch;
             scrollbar-width: none; /* Hide scrollbar for cleaner look */
           }
           .dish-scroll-container::-webkit-scrollbar {
             display: none;
           }
           .dish-grid {
             width: max-content;
             padding: 10px 20px 30px;
           }
        }
        
        @media (min-width: 993px) {
          .dish-grid {
            justify-content: center;
            flex-wrap: wrap; /* Allow wrapping on large screens if we add more dishes */
          }
          .dish-card {
            flex: 0 0 calc(25% - 23px); /* 4 cards per row approx */
            min-width: 250px;
          }
        }
      `}</style>
        </section>
    );
};

export default SignatureDishes;
