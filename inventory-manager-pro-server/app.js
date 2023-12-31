//external imports
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();


//internal imports
const products = require('./routes/products');
const user = require('./routes/users');
const invoice = require('./routes/invoice');
const apiFeatures = require('./utils/apiFeatures');


//variable declarations
const port = process.env.PORT || 5000


// deafult middlewares 
app.use(express.json());
app.use(cors());

//database connection
let dbUrl = process.env.DB_ATLAS;

// if (process.env.NODE_ENV === 'development') {

//     dbUrl = process.env.DB_LOCAL

// }
// else {
//     dbUrl = process.env.DB_ATLAS
// }

console.log("db url ", dbUrl);


mongoose.connect(dbUrl)
    .then(() => {
        console.log("Database connection established...");
    })
    .catch(err => {
        console.log("Error connecting to Database... " + err)
    })



//routes handlers middlewares
app.use('/api/products', products);
app.use('/api/user', user)
app.use('/api/invoice', invoice);
app.use('/api/features', apiFeatures);


//main route 
app.get('/', (req, res) => {
    res.send("Welcome to Inventory Management App Server!");

});


//listen to port:5000
app.listen(port, (req, res) => {
    console.log(`Listening to Inventory Management App Server: port ${port}`);
});



