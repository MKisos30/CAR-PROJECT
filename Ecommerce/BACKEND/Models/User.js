const { Schema, model } = require('mongoose');

const schemaUser = new Schema ({
    name: String,
    mail: String,
    password: String,
    role: String,
    cart: {
        items: [
            {
                productId: { 
                    type: Schema.Types.ObjectId,
                    ref: 'Product', require: true
                }
            }
        ]
    }, 
    reserve:{
        items:[
                {
                    reserveId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Reserve'
                }
            }
        ]
    }
})

schemaUser.methods.addToCart = function (car) {
   const items = [...this.cart.items]

   try {
        items.push({productId:car._id})
    } catch (error) {
        console.log(error)
    }
    this.cart = {items}
    return this.save()
}

schemaUser.methods.removeFromCart = function ( id ) {
    const allItems = [...this.cart.items]
    const items = allItems.filter(i => (i.productId.toString() !== id.toString()))
    this.cart = {items}
    return this.save()
}

schemaUser.methods.removeAllItems = function () {
    let items = [...this.cart.items]
    items = []
    this.cart = {items}
    return this.save()
}

schemaUser.methods.addToReserve = function (reserve) {
   const items = [...this.reserve.items]

   try {
        items.push({reserveId:reserve._id})
    } catch (error) {
        console.log(error)
    }
    
    this.reserve = {items}
    return this.save()
}

const User = model('User', schemaUser)
module.exports = User;
