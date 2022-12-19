const express = require("express");
const app = express();
const routerCart = require("./routes/cart");
const routerProducts = require("./routes/products");
//const Productos = require('./controllers/products/index.js')
const Products = require("./controllers/products/index.js");
const products = new Products();
const allProducts = products.products;
//console.log(allProducts)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

app.use(routerCart);
app.use(routerProducts);
app.get("/", (req, res) => {
  res.redirect("/api/productos");
});
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`servidor corriendo en el puerto ${server.address().port}`);
});

//app.get('/api',(req, res)=> res.send('Bienvenidos a la api'))
