const ProductsDAOContainer = require('../controllers/products/firebaseProduct')
const admin = require('firebase-admin')


const serviceAccount = require('../config/serviceAccountKey.json')

class ProductsContainerFile extends ProductsDAOContainer{
    
    async connect(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://ecommerce-coder-caitano.firebaseio.com'
        })
    }
}
module.exports = ProductsContainerFile