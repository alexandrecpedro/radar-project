var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', HomeController.index);

/* Clients */

module.exports = router;
