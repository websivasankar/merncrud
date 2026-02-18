const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.log('❌ Connection failed:', err));

app.get("/", (req, res) => {
	res.send('Server is running!');
});

// add after app.use(express.json())
app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});