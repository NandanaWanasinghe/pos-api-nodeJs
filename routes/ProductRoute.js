const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const verifyUser = require('../middleware/AuthMiddleWare');

//router.post('/create',verifyUser, ProductController.create);
router.post('/create', ProductController.create);
//router.get('/find-by-id',verifyUser, ProductController.findById);
router.get('/find-by-id/:id', ProductController.findById);
//router.delete('/delete-by-id',verifyUser, ProductController.deleteById);
router.delete('/delete-by-id/:id', ProductController.deleteById);
//router.put('/update',verifyUser, ProductController.update);
router.put('/update/:id', ProductController.update);
//router.get('/find-all',verifyUser, ProductController.findAll);
router.get('/find-all', ProductController.findAll);
//router.get('/find-all-min',verifyUser, productController.findAllMin);
router.get('/find-all-min', ProductController.findAllMin);
//router.get('/find-all-count',verifyUser, ProductController.findCount);
router.get('/find-all-count', ProductController.findCount);


module.exports = router;