var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const ClientsController = require('../controllers/clientsController');

/* GET home page. */
router.get('/', HomeController.index);

/* Clients */
router.get('/clients', ClientsController.index);
router.post('/clients', ClientsController.create);
router.get('/clients/:id', ClientsController.show);
router.delete('/clients/:id', ClientsController.delete);
router.put('/clients/:id', ClientsController.update);

module.exports = router;
