const { Router } = require('express');
const route = Router();
const { saveReserveDetails } = require('../Controllers/Reserve');

route
    .post('/save-reserve', saveReserveDetails)

module.exports = route;