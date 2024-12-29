import React, { useState, useEffect } from 'react';
import t1 from "../images/t1.webp";
import t2 from "../images/t2.webp";
import t3 from "../images/t3.webp";
import quote from "../images/quote.svg"
import "./Testimonials.css";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { img: t1, quote: "La formation était pertinente pour mes expériences personnelles . Autant de théorie que de pratique ce qui rend cette formation enrichissante  . Autant de théorie que de pratique ce qui rend cette formation enrichissante . Le formateur est toujours disponible , à l'écoute et avec des explications très claires.",
        name: "Ons Fadhel"
     },
    { img: t2, quote: "He is an excellent trainer, the explanations were very clear and the exercises very good. I will recommend this training.Very satisfactory training. ... I was particularly interested in the practical work with concrete examples and the discussions between the trainer and the participants",
        name: "Elouaer Aymen"
     },
    { img: t3, quote: "c'était une excellente formation, les explications étaient claires, j'ai été particulièrement intéressée par la pratique avec les exemples concrets et les discussions entre le formateur et les participants.",
        name: "Garrouch Rihem" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section id="brand-testimonial" className="section">
        <h1>Testimonials</h1>
      <div className="slider-wrapper">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">                
              <div className="testimonial-image-wrapper">
                <img src={testimonial.img} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className='quote-img'>
                    <img src={quote} alt="quote"  />
                </div>
                <div className="quote"><p>"
                    {testimonial.quote}"</p></div>
                <div className="testimonial-name">{testimonial.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
