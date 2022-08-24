const { Router } = require('express');
const route = Router();
const { 
    register, 
    login, 
    getRole, 
    userOut, 
    addToCart,
    getUserCart,
    removeFromCart,
    getUserData,
    getUserReserve,
} = require('../Controllers/Users')

route
    .post('/register', register)
    .post('/login', login)
    .get('/get-role', getRole)
    .get('/logout', userOut)
    .post('/addToCart', addToCart)
    .get('/getUserCart', getUserCart)
    .get('/removeFromCart', removeFromCart)
    .get('/getUserData', getUserData)
    .get('/getUserReserve', getUserReserve)

module.exports = route;