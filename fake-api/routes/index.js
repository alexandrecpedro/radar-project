var express = require('express');
var router = express.Router();
const HomeController = require('../controllers/homeController');
const ClientsController = require('../controllers/clientsController');
const ProductsController = require('../controllers/productsController');
const OrdersController = require('../controllers/ordersController');

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

/* Orders */
router.get('/orders', OrdersController.index);
router.post('/orders', OrdersController.create);
router.get('/orders/:id', OrdersController.show);
router.delete('/orders/:id', OrdersController.delete);
router.put('/orders/:id', OrdersController.update);

module.exports = router;
