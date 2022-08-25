const User = require('../Models/User');
const Product = require('../Models/Product')
const bcrypt = require('bcryptjs');
const { regValidation } = require('../Validation/UserValidation')

exports.register = async (req, res) => {
    try {
        const { name, mail, password, confirmPass } = req.body
        const { error } = regValidation.validate({ name, mail, password, repeat_password: confirmPass })

        if (error) {
            res.send({ message: error.message })
        }

        if (!error) {
            const userExist = await User.findOne({ mail })

            if (!userExist) {
                if (password === confirmPass) {
                    const hashpass = await bcrypt.hash(password, 10)

                    const user = new User({ name, mail, password: hashpass, role: "user", cart: { items: [] } })
                    const newUser = await user.save();

                    if (newUser) {
                        res.send({ ok: true, newUser, message: "Register succses" })
                    } else {
                        res.send({ ok: false, message: "There is some problem" })
                    }
                } else {
                    res.send({ ok: false, message: "The password and confirm password are not the same" })
                }
            } else {
                res.send({ ok: false, message: "User alredy exist" })
            }
        }
    } catch (error) {
        res.send(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const userExist = await User.findOne({ mail })
        if (userExist) {
            const passSame = await bcrypt.compare(password, userExist.password)

            if (passSame) {
                res.cookie("userInfo", { name: userExist.name, id: userExist._id, role: userExist.role }, { maxAge: 60 * 60 * 3 * 1000 })

                res.send({ ok: true, userExist, login: true, role: userExist.role })

            } else {
                res.send({ ok: false, message: "Uncorrect password" })
            }
            
        } else {
            res.send({ ok: false, message: "User not exist" })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.getRole = async (req, res) => {
    try {
        const { userInfo } = req.cookies

        if (userInfo) {
            if (userInfo.role === "admin") {
                res.send({ userLogin: true, role: userInfo.role })
            } else {
                res.send({ userLogin: true, role: "user" })
            }
        } else {
            res.send({ userLogin: false })
        }
    } catch (error) {
        res.send(error)
    }
}

exports.userOut = (req, res) => {
    try {
        res.clearCookie("userInfo")
        res.send({ userLogin: false, cookie: 'cookie deleted' })
    } catch (error) {
        res.send(error)
    }
}

exports.addToCart = async (req, res) => {
    try {
        const { carId } = req.body
        const { userInfo } = req.cookies
        const userId = userInfo.id

        const user = await User.findById(userId)
        const car = await Product.findById(carId)

        await user.addToCart(car)
        res.send(car)
    } catch (error) {
        res.send(error)
    }
    
}

function mapCartItems(cart) {
    return cart.items.map(i => ({
        ...i.productId._doc,
        id: i.productId.id
    }))
}

exports.getUserCart = async (req, res) => {
    try {
        const { userInfo } = req.cookies
        const { id } = userInfo
        const user = await User.findById(id)

        const userCart = await user.populate("cart.items.productId")

        const cart = mapCartItems(userCart.cart)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
    
}

exports.removeFromCart = async (req, res) => {
    try {
        const { carId } = req.query
        const { userInfo } = req.cookies
        const { id } = userInfo
        const user = await User.findById(id)

        await user.removeFromCart(carId)

        const userCart = await user.populate("cart.items.productId")

        const cart = mapCartItems(userCart.cart)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
    
}

exports.getUserData = async (req, res) => {
    try {
        const { userInfo } = req.cookies
        const { id } = userInfo
        const user = await User.findById(id)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

function mapReserveItems(reserve) {
    return reserve.items.map(i => ({
        ...i.reserveId._doc,
        id: i.reserveId.id
    }))
}

exports.getUserReserve = async (req, res) => {
    try {
        const { userInfo } = req.cookies
        const { id } = userInfo
        const user = await User.findById(id)
    
        const userReserve = await user.populate("reserve.items.reserveId")
    
        const reserve = mapReserveItems(userReserve.reserve)
        res.send(reserve)
    } catch (error) {
        res.send(error)
    }
}

