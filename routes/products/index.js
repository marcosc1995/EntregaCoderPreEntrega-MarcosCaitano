const {Router} = require('express')

const routerProducts = new Router()
const ProductsController = require('../../controllers/products/index.js')
const controller = new ProductsController()

routerProducts.get('/', (req, res)=>{res.send('Bienvenidos a Productos')})
routerProducts.post('/', (req, res)=>{
    // res.send('Bienvenidos a Productos')
    controller.save(req.body)
    // console.log(req.body)
    res.send('se guardo con exito')
})
routerProducts.put('/', (req, res)=>{res.send('Bienvenidos a Productos')})
routerProducts.delete('/', (req, res)=>{res.send('Bienvenidos a Productos')})

module.exports = routerProducts