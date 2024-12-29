const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://seiifmansour:TGFDkMa8lGEJnUvL@courses.dhdxp.mongodb.net/?retryWrites=true&w=majority&appName=courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected successfully'));
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

//schema
const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: Buffer, 
});

const Course = mongoose.model('Course', courseSchema);

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/courses', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const image = req.file ? req.file.buffer : null; 
  const course = new Course({ title, price, image });
  await course.save();
  res.json(course);
});

app.put('/courses/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  const image = req.file ? req.file.buffer : null;
  const course = await Course.findByIdAndUpdate(id, { title, price, image }, { new: true });
  res.json(course);
});

app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.json({ message: 'Course deleted successfully' });
});

app.get('/courses/image/:id', async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (course && course.image) {
    res.set('Content-Type', 'image/jpeg'); 
    res.send(course.image); 
  } else {
    res.status(404).send('Image not found');
  }
});
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));  