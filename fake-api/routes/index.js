var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const ClientsController = require('../controllers/clientsController');
const ProductsController = require('../controllers/productsController');

/* GET home page. */
router.get('/', HomeController.index);

/* Clients */
router.get('/clients', ClientsController.index);
router.post('/clients', ClientsController.create);
router.get('/clients/:id', ClientsController.show);
router.delete('/clients/:id', ClientsController.delete);
router.put('/clients/:id', ClientsController.update);

/* Products */
router.get('/products', ProductsController.index);
router.post('/products', ProductsController.create);
router.get('/products/:id', ProductsController.show);
router.delete('/products/:id', ProductsController.delete);
router.put('/products/:id', ProductsController.update);

module.exports = router;
