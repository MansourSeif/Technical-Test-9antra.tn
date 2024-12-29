import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditCourse.css';

const EditCourse = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', price: '', image: null });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/courses/${id}`);
      console.log('Fetched course:', res.data); 
      setCourse(res.data);
    } catch (err) {
      console.error('Error fetching course:', err);
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('price', course.price);
    if (course.image) {
      formData.append('image', course.image);
    }

    try {
      const res = await axios.put(`http://localhost:5000/courses/${id}`, formData);
      console.log('Updated course:', res.data); 
      navigate('/admin'); 
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  return (
    <div className="edit-course">
      <h3>Edit Course</h3>
      <form onSubmit={updateCourse} className="course-form">
        <input
          type="text"
          placeholder={course.title || 'Enter Course Title'}
          value={course.title || ''}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
        <input
          type="number"
          placeholder={course.price || 'Enter Price'}
          value={course.price || ''}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setCourse({ ...course, image: e.target.files[0] })}
        />
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
