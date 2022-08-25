const { Schema, model } = require('mongoose');

const schemaProduct = new Schema ({
    name: String,
    type: String,
    color: String,
    price: Number,
    engineCapacity: String,
    img: String,
    folder:String
})

const Product = model('Product', schemaProduct)
module.exports = Product;

