const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose'); // Comment out

require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Comment these mongoose connection lines for now:
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
