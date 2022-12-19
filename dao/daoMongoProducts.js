const mongoose = require('mongoose')
const ProductsDAOContainer = require('../controllers/products/productMongo')
mongoose.set("strictQuery", false);

const mongoUrl = 'mongodb+srv://marcos_c95:m4n78se3122549@cluster0.hprbddw.mongodb.net/ecommerce?retryWrites=true&w=majority'

class ProductsContainerFile extends ProductsDAOContainer{
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
module.exports = ProductsContainerFile