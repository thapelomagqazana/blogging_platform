const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try
    {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' , algorithm: 'HS256'});

      // Verify the token
        try {
            const decoded = jwt.verify(token, 'your-secret-key', { algorithms: ['HS256'] });
            console.log(decoded);
        } catch (error) {
            console.error('Invalid token:', error.message);
        }
    
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };