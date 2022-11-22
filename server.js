const express = require('express')
const app = express()
const routerCart = require("./routes/cart")
const routerProducts = require("./routes/products")


app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api/cart', routerCart)
app.use('/api/products', routerProducts)
const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log(`servidor corriendo en el puerto ${server.address().port}`)
})

app.get('/api',(req, res)=> res.send('Bienvenidos a la api'))