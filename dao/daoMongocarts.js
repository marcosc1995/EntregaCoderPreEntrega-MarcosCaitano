const mongoose = require('mongoose')
const CartDAOContainer = require('../controllers/cart/cartMongo')
const mongoUrl = 'mongodb+srv://marcos_c95:m4n78se3122549@cluster0.hprbddw.mongodb.net/ecommerce?retryWrites=true&w=majority'

class CartContainerFile extends CartDAOContainer{
    async connect(){
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
    }
    async disconnect(){
        await mongoose.disconnect()
    }
}
module.exports = CartContainerFile