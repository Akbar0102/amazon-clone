const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');

dotenv.config();

const app = express();

// Configure mongoose to connect database
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => {
        console.log('Connection success');
    }).catch(err =>{
        console.log('Connection failed');
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// require api
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);

app.listen(3000, err => {
    if(err){
        console.log(err);
    }else{
        console.log('Listening on PORT: ', 3000);
    }
});