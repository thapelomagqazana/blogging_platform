const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');
const homeRoutes = require('./routes/homeRoutes');
const blogPostInteractionRoutes = require('./routes/blogPostInteractionRoutes');

const cors = require('cors');

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

// Use cors middleware
app.use(cors());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', blogPostRoutes);
app.use('/api', homeRoutes); // Add this line for the homepage route
app.use('/api', blogPostInteractionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});