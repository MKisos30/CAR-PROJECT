const Product = require('../Models/Product');

exports.showAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products)
    } catch (error) {
        res.send(error)
    }
}

exports.addNewProduct = async (req, res) => {
    try {
        const { userInfo } = req.cookies

        if (userInfo && userInfo.role === "admin") {
            const { name, type, color, price, engineCapacity, img, folder } = req.body
            const newItem = new Product({ name, type, color, price, engineCapacity, img, folder })
            await newItem.save();
            const products = await Product.find();
            res.send(products);
        }
    } catch (error) {
        res.send(error)
    }
}

exports.getByCategory = async (req, res) => {
    try {
        const { type, color, ccm } = req.query;

        const category = await Product.find({ type })
        //res.send(category)

        let filtered
        if (color.length > 0 && ccm.length > 0) {
            filtered = category.filter((item) => item.color === color && item.engineCapacity === ccm)
        } else if (color.length > 0) {
            filtered = category.filter((item) => item.color === color)
        } else if (ccm.length > 0) {
            filtered = category.filter((item) => item.engineCapacity === ccm)
        } else {
            filtered = category
        }

        res.send(filtered)
    } catch (error) {
        res.send(error)
    }
}

exports.getCar = async (req, res) => {
    try {
        const { id } = req.query

        const car = await Product.findById(id)
        res.send(car)
    } catch (error) {
        res.send(error)
    }
}

exports.editCar = async (req, res) => {
    try {
        const { userInfo } = req.cookies

        if (userInfo && userInfo.role === "admin") {
            const { id, type, name, price, color, engineCapacity, folder, img } = req.body

            const updated = await Product.findByIdAndUpdate(id, {
                type, name, price, color, engineCapacity, folder, img
            })

            if (updated) {
                const allCars = await Product.find()
                res.send(allCars)
            }
        }
    } catch (error) {
        res.send(error)
    }
}

exports.deleteCar = async (req, res) => {
    try {
        const { userInfo } = req.cookies

        if (userInfo && userInfo.role === "admin") {
            const { id } = req.body;
            await Product.findByIdAndDelete(id)
            const products = await Product.find()
            res.send(products)
        }
    } catch (error) {
        res.send(error)
    }
}

exports.searchCarByName = async (req, res) => {
    try {
        const { name } = req.params;
        const car = await Product.findOne({ name })
        if (car) {
            res.send({ ok: true, car })
        } else {
            res.send({ ok: false, massage: 'Car not found' })
        }
    } catch (error) {
        res.send(error)
    }
}