
import React from 'react';

const About = () => {
    return (
        <section id="about" className="section-padding bg-black">
            <div className="container">
                <div className="about-content">
                    <h2 className="section-title text-primary">About Maisai</h2>
                    <div className="divider"></div>
                    <p className="about-text">
                        Maisai Chinese & Mocktail Boba brings the heat of authentic street-style Chinese cuisine to Thane.
                        We blend fiery wok flavors with refreshing, handcrafted mocktails and boba teas in a vibrant,
                        modern setting. Whether you're craving spicy Schezwan or a cool taro boba, we promise a bold
                        taste experience that fits your vibe.
                    </p>

                    <div className="about-details">
                        <div className="detail-item">
                            <h4 className="text-primary">Location</h4>
                            <p>Madhvi Chowk, near Rosa Manhattan,<br /> Hiranandani Estate, Thane West, Maharashtra 400615</p>
                        </div>
                        <div className="detail-item">
                            <h4 className="text-primary">Opening Hours</h4>
                            <p>Mon - Sun: 12:00 PM – 11:30 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .about-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .section-title {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .divider {
          width: 100px;
          height: 4px;
          background-color: var(--color-primary);
          margin: 0 auto 30px;
        }
        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 50px;
          color: #ddd;
        }
        .about-details {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 30px;
        }
        .detail-item h4 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .detail-item p {
          color: #aaa;
        }
      `}</style>
        </section>
    );
};

export default About;
