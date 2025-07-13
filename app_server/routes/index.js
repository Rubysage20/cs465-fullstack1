var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main'); // Import the main controller



/* GET home page. */
router.get('/', ctrlMain.index); // Use the index method from the main controller{

module.exports = router;
