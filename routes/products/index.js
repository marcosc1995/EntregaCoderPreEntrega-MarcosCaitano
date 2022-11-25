const { Router } = require("express");

const routerProducts = new Router();
const ProductsController = require("../../controllers/products/index.js");
const controller = new ProductsController();
const allProducts = controller.getAll();

routerProducts.get("/", async (req, res) => {
  const prod = await controller.getAll();
  res.send(prod);
});
routerProducts.get("/:id", async (req, res) => {
  const idParam = parseInt(req.params.id);
  const product = await controller.getById(idParam);
  res.send(product);
});
routerProducts.post("/", (req, res) => {
  controller.save(req.body);

  res.send("se guardo con exito");
});
routerProducts.put("/:id", async (req, res) => {
  const idParam = parseInt(req.params.id);
  const { body } = req;
  body.id = idParam;
  const newList = await controller.replaceById(body);
  //controller.writeData(newList)
  res.send(newList);
});
routerProducts.delete("/:id",async (req, res) => {
  try {
    const idParam = parseInt(req.params.id);
    const deleted = await controller.deleteById(idParam);
    res.send(`Producto con ID: ${idParam} borrado Correctamente`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = routerProducts;
