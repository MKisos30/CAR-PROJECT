const { Schema, model } = require('mongoose');

const rserveSchema = new Schema ({
    name: String,
    adress: String,
    phoneNumber: String,
    creditCardNumber: String,
    creditCardValidity: String,
    cvv: Number,
    idNumber: Number, 
    amout:Number,
    totalPrice:Number,
    namesOfCars:Array
})


const Reserve = model('Reserve', rserveSchema)
module.exports = Reserve;
