const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Omit sensitive information like password
    const userProfile = {
      _id: user._id,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    };

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bio, avatar } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user profile
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    
    await user.save();

    res.json({ message: 'User profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};