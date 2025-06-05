const express = require('express');
const router = express.Router();

const defaultUser = {
  email: 'admin@example.com',
  password: 'admin123',
  username: 'Admin',
  age: 25,
  goal: 'Leadership'
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === defaultUser.email && password === defaultUser.password) {
    res.status(200).json({ message: 'Login successful', user: defaultUser });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', (req, res) => {
  res.status(200).json({ message: 'Signup disabled for now.' });
});

module.exports = router;
