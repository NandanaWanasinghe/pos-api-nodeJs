const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');
const verifyUser = require('../middleware/AuthMiddleWare');

router.post('/create',verifyUser, OrderController.create);
router.get('/find-by-id',verifyUser, OrderController.findById);
router.delete('/delete-by-id',verifyUser, OrderController.deleteById);
router.put('/update',verifyUser, OrderController.update);
router.get('/find-all',verifyUser, OrderController.findAll);
//router.get('/find-count',verifyUser, OrderController.findAllCount);
router.get('/find-count', OrderController.findAllCount);

module.exports = router;