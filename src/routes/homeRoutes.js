const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/homepage', homeController.getHomepage);

module.exports = router;