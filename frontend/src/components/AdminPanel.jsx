import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', price: '', image: null });
  const [isAddCourse, setIsAddCourse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newCourse.title);
    formData.append('price', newCourse.price);
    if (newCourse.image) {
      formData.append('image', newCourse.image);
    }

    try {
      const res = await axios.post('http://localhost:5000/courses', formData);
      setCourses([...courses, res.data]);
      setNewCourse({ title: '', price: '', image: null });
    } catch (err) {
      console.error('Error adding course:', err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const editCourse = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setIsAddCourse(true)}>Add Courses</li>
          <li onClick={() => setIsAddCourse(false)}>Browse Courses</li>
        </ul>
      </div>

      <div className="main-content">
        {isAddCourse ? (
          <div className="add-course">
            <h3>Add New Course</h3>
            <form onSubmit={addCourse} className="course-form">
              <input
                type="text"
                placeholder="Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
              />
              <input
                type="file"
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.files[0] })}
              />
              <button type="submit" className='add-course'>Add Course</button>
            </form>
          </div>
        ) : (
          <div className="browse-courses">
            <h3>All Courses</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.price} DT</td>
                    
                    <td>
                      <button onClick={() => editCourse(course._id)}>Edit</button>
                      <button onClick={() => deleteCourse(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
