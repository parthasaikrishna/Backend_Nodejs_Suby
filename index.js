const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const db = require('./dbConnection/dbConnect');
const vendorRoute = require('./routes/vendorRoute');
const firmRoute = require('./routes/firmRoutes');
const productRoute = require('./routes/productRoute');
const path = require('path');
db();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // for form requests

app.get('/home', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.use('/vendors', vendorRoute);
app.use("/firms", firmRoute);
app.use("/products",productRoute)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
