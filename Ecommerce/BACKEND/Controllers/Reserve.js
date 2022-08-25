const Reserve = require('../Models/Reserve');
const Users = require('../Models/User');
const { cardValidation } = require('../Validation/CardValidation')

exports.saveReserveDetails = async (req, res) => {
    try {
        const { name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber, amout, totalPrice, namesOfCars } = req.body;
        const {error} = cardValidation.validate({ name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber })
        
        if(!error) {
            const newReserve = new Reserve ({ name, adress, phoneNumber, creditCardNumber, creditCardValidity, cvv, idNumber, amout, totalPrice, namesOfCars})
            await newReserve.save();
    
            const {userInfo} = req.cookies
            const {id} = userInfo;
            const user = await Users.findById(id)
    
            await user.addToReserve(newReserve)
            await user.removeAllItems()

            res.send({ok:true})
        } else {
            res.send({message: error.details[0].message})
        }
    } catch (error) {
        res.send(error)
    }
}