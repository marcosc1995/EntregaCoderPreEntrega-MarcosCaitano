const {Router} = require('express')

const routerCart = new Router()

routerCart.get('/', (req, res)=>{res.send('Bienvenidos al carrito')})
routerCart.post('/', (req, res)=>{res.send('Bienvenidos al carrito')})
routerCart.post('/', (req, res)=>{res.send('Bienvenidos al carrito')})
routerCart.delete('/', (req, res)=>{res.send('Bienvenidos al carrito')})
routerCart.delete('/', (req, res)=>{res.send('Bienvenidos al carrito')})

module.exports = routerCart