const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController');
const verifyUser = require('../middleware/AuthMiddleWare');

//router.post('/create',verifyUser, CustomerController.create);
router.post('/create', CustomerController.create);
//router.get('/find-by-id/:id',verifyUser, CustomerController.findById);
router.get('/find-by-id/:id', CustomerController.findById);
//router.delete('/delete-by-id',verifyUser, CustomerController.deleteById);
router.delete('/delete-by-id/:id',CustomerController.deleteById);
//router.put('/update',verifyUser, CustomerController.update);
router.put('/update/:id',CustomerController.update);
//router.get('/find-all',verifyUser, CustomerController.findAll);
router.get('/find-all',CustomerController.findAll);
//router.get('/find-count',verifyUser, CustomerController.findCount);
router.get('/find-count', CustomerController.findCount);

module.exports = router;