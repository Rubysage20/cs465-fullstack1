const express = require('express'); // Express app

const router = express.Router(); // Router logic

const tripsController = require('../controllers/trips');
//const { get } = require("mongoose");

router
    .route('/trips')
    .get(tripsController.tripsList); // GET Method routes tripList

// GET Method routes tripsFindByCode - require parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // Use tripsFindByCode controller


module.exports = router;