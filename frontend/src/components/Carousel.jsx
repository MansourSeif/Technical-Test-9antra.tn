import React, { useState } from 'react';
import './Carousel.css'; 
import slide1 from "../images/Certification-bro.svg" ; 
import slide2 from "../images/Online test-bro.svg" ; 
import slide3 from "../images/Webinar-pana.svg" ; 

const slides = [
  {
    title: "Earn Your Certification",
    description: "Unlock your potential with our certification programs. Gain the skills and knowledge to advance in your career and showcase your expertise to the world.",
    image: slide1 
  },
  {
    title: "Master Online Tests",
    description: "Prepare for success with our comprehensive online test platform. Practice and assess your skills with quizzes and exams tailored to your learning journey.",
    image: slide2 
  },
  {
    title: "Teach Online with Confidence",
    description: "Join the growing community of educators and create impactful online courses. Share your knowledge, engage with students, and make a difference in the world of education.",
    image: slide3 
  }
];


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); 
  };

  return (
    <div className="carousel-section">
      <h1>Explore Our Learning Experience</h1>
      <p>Join thousands of students learning from top instructors worldwide. Browse courses and start your journey today!</p>

      <div className="carousel-container">
        <div className="carousel-slide">
          <div className="carousel-content">
            <h3>{slides[currentSlide].title}</h3>
            <p>{slides[currentSlide].description}</p>
          </div>
          <div className="carousel-image">
            <img
              src={slides[currentSlide].image} 
              alt={`Carousel Slide ${currentSlide + 1}`}
            />
          </div>
        </div>
      </div>

      <div className="carousel-buttons">
        <button className="carousel-button prev" onClick={handlePrevSlide}>
          &#10094; 
        </button>
        <button className="carousel-button next" onClick={handleNextSlide}>
          &#10095; 
        </button>
      </div>
    </div>
  );
};

export default Carousel;
