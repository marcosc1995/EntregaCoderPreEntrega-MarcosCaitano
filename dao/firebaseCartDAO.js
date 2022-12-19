const CartDAOContainer = require('../controllers/cart/firebaseCart')
const admin = require('firebase-admin')


const serviceAccount = require('../config/serviceAccountKey.json')

class CartContainerFile extends CartDAOContainer{
    
    async connect(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'ecommerce-coder-caitano.firebaseio.com'
        })
    }
}
module.exports = CartContainerFile