import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; 
import './LandingPage.css';
import OnlineLearning from "../images/online-learning.svg";
import Carousel from '../components/Carousel';  
import bro from "../images/angular-spring.webp"; 
import student from "../images/student-svgrepo-com.png";
import teacher from "../images/teacher-svgrepo-com.png";
import book from "../images/book-bookmark-minimalistic-svgrepo-com.png";
import image from "../images/image.svg";
import Testimonials from './Testimonials';
import Contact from "../images/contact.svg";

const LandingPage = () => {
    const [courses, setCourses] = useState([]);
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/contact', contactData);
            console.log('Message sent:', res.data);
            setContactData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            alert("Your message has been sent!");
        } catch (err) {
            console.error('Error sending message:', err);
            alert("There was an error sending your message. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="landing-page">

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>Improve your skills on your own to prepare for a better future</h1>
                        <p>
                            Empower yourself to achieve your goals with the best online courses, carefully tailored to suit your needs and help you unlock your full potential.
                        </p>
                        <button className="hero-button">Get Started</button>
                    </div>
                    <div className="hero-right">
                        <img
                            src={OnlineLearning}
                            alt="Right Illustration"
                            className="hero-side-image"
                        />
                    </div>
                </div>

                {/* Carousel Component */}
                <Carousel />

                {/* Courses Section */}
<div className="courses-section">
    <h2>Discover Our Courses</h2>
    <div className="courses-container">
        {courses.slice(0, 3).map((course) => (
            <div className="course-card" key={course._id}>
                <div className="course-image-wrapper">
                    <img
                        src={course.image || bro} 
                        alt={course.title}
                        className="course-image"
                    />
                </div>
                <div className="course-info">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-price">{course.price} TND</p>
                    <button 
                        className="course-button" 
                        onClick={() => window.location.href = `/course/${course._id}`}
                    >
                        Learn More
                    </button>
                </div>
            </div>
        ))}
    </div>
    <button className="explore-more-button" onClick={() => window.location.href = "/courses"}>
        Explore More
    </button>
</div>


                {/*  help section */}
                <div className="help-section">
                    <div className="help-container">
                        <div className="help-image">
                            <img src={image} alt="Helping illustration" />
                        </div>
                        <div className="help-content">
                            <h2>We are here to help</h2>
                            <p>
                                Become who you want to be with The Bridge. Choose your own career path and earn an online degree with hands-on projects and weekly one-on-one mentoring sessions with a dedicated professional in your field.
                            </p>
                            <div className="statistics">
                                <div className="stat-item">
                                    <img src={student} alt="" />
                                    <h3>Students</h3>
                                    <p>3,800+</p>
                                </div>
                                <div className="stat-item">
                                    <img src={book} alt="" />
                                    <h3>Courses</h3>
                                    <p>966+</p>
                                </div>
                                <div className="stat-item">
                                    <img src={teacher} alt="" />
                                    <h3>Trainers</h3>
                                    <p>187+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Testimonials />

                {/* Contact Section */}
                <div className="contact-section">
                    <div className="contact-form-container">
                        <h1>Contact Us</h1>
                        <form onSubmit={handleContactSubmit} className="contact-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={contactData.name}
                                onChange={handleContactChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={contactData.email}
                                onChange={handleContactChange}
                                required
                            />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={contactData.subject}
                                onChange={handleContactChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={contactData.message}
                                onChange={handleContactChange}
                                required
                            />
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                    <div className="contact-image">
                        <img src={Contact} alt="" />
                    </div>
                </div>

                <footer className="footer">
                    <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
