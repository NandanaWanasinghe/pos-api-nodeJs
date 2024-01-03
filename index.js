const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

//--------------------------------------------
const UserRouter = require('./routes/UserRoute');
const CustomerRoute = require('./routes/CustomerRoute');
const ProductRoute = require('./routes/ProductRoute');
const OrderRoute = require('./routes/OrderRoute');

//--------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
    mongoose.connect('mongodb://127.0.0.1:27017/posapi');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
catch{
    console.log(e)
}
app.get('/test-api',(req,res)=>{
    return res.json({'message':'Server Started!'});
})

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/customers', CustomerRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/orders', OrderRoute);



