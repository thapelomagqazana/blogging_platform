const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/profile/:userId', profileController.getUserProfile);
router.put('/profile/:userId', profileController.updateUserProfile);

module.exports = router;