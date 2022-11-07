const express = require('express')
const app = express()

app.use(express.json());

const ErrorMiddleware = require('./middlewares/error');

//Route imports
const product = require('./routes/productRoute');

app.use('/api/v1', product);

//setting error middleware to handle errors
app.use(ErrorMiddleware);

//exporting the app to make available in other places
module.exports = app