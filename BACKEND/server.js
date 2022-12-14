require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5482;
const mongoose = require('./Utils/ConectDB')
const cookieParser = require('cookie-parser')
const path  = require('path');

app.use(cookieParser())

mongoose();
app.use(express.static(path.resolve(__dirname, '..', 'FRONTEND','build')))
app.use(express.json())

app.use('/product', require('./Routes/Product'));
app.use('/user', require("./Routes/User"));
app.use('/reserve', require("./Routes/Reserve"));

app.listen(PORT, () => {
    console.log(`running on port http://localhost:${PORT}`)
})
