const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const routerCart = new Router();
const CartController = require("../../controllers/cart/index.js");
const controller = new CartController();

routerCart.post("/", async (req, res) => {
  const newCart = await controller.saveCart(req.body);

  // const testCart = {
  //   id: 10,
  //   products: [
  //     {
  //       nombre: "product1",
  //       description: "description product",
  //       code: 666,
  //       img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
  //       price: 999,
  //       stock: 100,
  //       id: 1,
  //       date: "Wed, 23 Nov 2022 19:34:10 GMT"
  //     },
  //     {
  //       nombre: "product2",
  //       description: "description product2",
  //       code: 666,
  //       img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
  //       price: 999,
  //       stock: 100,
  //       id: 2,
  //       date: "Wed, 23 Nov 2022 19:34:33 GMT"
  //     }

  //   ],
  // };
  // testCart.date = controller.generateDate()
  // controller.createCart(testCart, testCart.id);
  res.send(`nuevo carrito creado con la ID: ${newCart}`);
});
// routerCart.post("/:id", (req, res) => {
//   const idParam = parseInt(req.params.id);
//   const testCart = {
//     id: idParam,
//     products: [
//       {
//         nombre: "product1",
//         description: "description product",
//         code: 666,
//         img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
//         price: 999,
//         stock: 100,
//         id: 1,
//         date: "Wed, 23 Nov 2022 19:34:10 GMT"
//       },
//       {
//         nombre: "product2",
//         description: "description product2",
//         code: 666,
//         img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
//         price: 999,
//         stock: 100,
//         id: 2,
//         date: "Wed, 23 Nov 2022 19:34:33 GMT"
//       }

//     ],
//   };
//   testCart.date = controller.generateDate()
//   controller.createCart(testCart, testCart.id);
//   res.send(`carrito creado con la id ${testCart.id}`);
// });
routerCart.get("/:id/products", async (req, res) => {
  const idParam = parseInt(req.params.id);
  const cart = await controller.getCartById(idParam);

  res.send(cart.products);
});
routerCart.delete("/:id", async (req, res) => {
  const idParam = parseInt(req.params.id);
  await controller.deleteCartById(idParam);
  res.send(`carrito con ID: ${idParam} borrado`);
});

routerCart.post("/:id/products", async (req, res) => {
  const idParam = parseInt(req.params.id);
  const { body } = req;
  const newPrdList = await controller.addPrdByCartId(body, idParam);

  res.send(
    `nuevo producto con ID: ${newPrdList.id} guardado en el carrito ${idParam}`
  );
});

routerCart.delete("/:id/products/:idPrd", async (req, res) => {
  const idCartParam = parseInt(req.params.id);
  const idPrdParam = parseInt(req.params.idPrd);
  const deleted = await controller.delPrdByCartId(idPrdParam, idCartParam);

  res.send(`Producto con ID ${idPrdParam} Borrado del carrito ${deleted}`);
});

module.exports = routerCart;
