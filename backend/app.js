const express = require('express')
const app = express()

app.use(express.json());

const ErrorMiddleware = require('./middlewares/error');

//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

//setting error middleware to handle errors
app.use(ErrorMiddleware);

//exporting the app to make available in other places
module.exports = app