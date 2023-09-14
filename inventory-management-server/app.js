
//external imports
const express = require('express');
const app = express();
const cors = require('cors');



//internal imports
const products = require('./routes/products');

//variable declarations
const port = process.env.PORT || 5000

// deafult middlewares 
app.use(express());
app.use(cors());


//routes handlers middlewares
app.use('/api/products', products);


//main route 
app.get('/', (req, res) => {
    res.send("Welcome to Inventory Management App Server!");

});

//listen to port:5000
app.listen(port, (req, res) => {
    console.log(`Listening to Inventory Management App Server: port ${port}`);
});