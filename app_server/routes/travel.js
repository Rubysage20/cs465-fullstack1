var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel'); // Import the travel controller

/* GET travel page. */
router.get('/travel', controller.travel); // Use the travel method from the travel 

module.exports = router; // Export the router

