const { Router } = require("express");
const router = Router();

//Mongodb
const CartContainerFile = require(`../../dao/daoMongocarts`);
//firebase
//const CartContainerFile = require(`../../dao/firebaseCartDAO`);
const cartContainerAccess = new CartContainerFile();

router.get("/api/carritos", async (req, res) => {
  try {
    const allCart = await cartContainerAccess.getAll();
    res.json(allCart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/carritos", async (req, res) => {
  try {
    const cart = await cartContainerAccess.createCart();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/carritos/:id", async (req, res) => {
  try {
    const idRecieved = req.params.id;
    const deletedCart = await cartContainerAccess.deleteById(idRecieved);
    res.json(deletedCart);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/api/carritos/:id_cart/productos/:id_prod", async (req, res) => {
  try {
    const idCartRecieved = req.params.id_cart;
    const idProdRecieved = req.params.id_prod;
    const deletedProduct = await cartContainerAccess.deleteProductFromCart(
      idCartRecieved,
      idProdRecieved
    );
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
  }
});
router.get("/api/carritos/:id/productos", async (req, res) => {
  try {
    const idRecieved = req.params.id;
    const cart = await cartContainerAccess.getByID(idRecieved);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});
router.put("/api/carritos/:id_cart/productos/:id_prod", async (req, res) => {
  try {
    const idCartRecieved = req.params.id_cart;
    const idProdRecieved = req.params.id_prod;
    const addProductsToCart = await cartContainerAccess.addProductToCart(
      idCartRecieved,
      idProdRecieved
    );
    res.json(addProductsToCart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
// const { Router } = require("express");
// const { v4: uuidv4 } = require("uuid");

// const routerCart = new Router();
// const CartController = require("../../controllers/cart/index.js");
// const controller = new CartController();

// routerCart.post("/", async (req, res) => {
//   const newCart = await controller.saveCart(req.body);

//   // const testCart = {
//   //   id: 10,
//   //   products: [
//   //     {
//   //       nombre: "product1",
//   //       description: "description product",
//   //       code: 666,
//   //       img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
//   //       price: 999,
//   //       stock: 100,
//   //       id: 1,
//   //       date: "Wed, 23 Nov 2022 19:34:10 GMT"
//   //     },
//   //     {
//   //       nombre: "product2",
//   //       description: "description product2",
//   //       code: 666,
//   //       img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
//   //       price: 999,
//   //       stock: 100,
//   //       id: 2,
//   //       date: "Wed, 23 Nov 2022 19:34:33 GMT"
//   //     }

//   //   ],
//   // };
//   // testCart.date = controller.generateDate()
//   // controller.createCart(testCart, testCart.id);
//   res.send(`nuevo carrito creado con la ID: ${newCart}`);
// });
// // routerCart.post("/:id", (req, res) => {
// //   const idParam = parseInt(req.params.id);
// //   const testCart = {
// //     id: idParam,
// //     products: [
// //       {
// //         nombre: "product1",
// //         description: "description product",
// //         code: 666,
// //         img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
// //         price: 999,
// //         stock: 100,
// //         id: 1,
// //         date: "Wed, 23 Nov 2022 19:34:10 GMT"
// //       },
// //       {
// //         nombre: "product2",
// //         description: "description product2",
// //         code: 666,
// //         img: "https://cdn2.iconfinder.com/data/icons/leto-blue-big-data/64/big_data-04-512.png",
// //         price: 999,
// //         stock: 100,
// //         id: 2,
// //         date: "Wed, 23 Nov 2022 19:34:33 GMT"
// //       }

// //     ],
// //   };
// //   testCart.date = controller.generateDate()
// //   controller.createCart(testCart, testCart.id);
// //   res.send(`carrito creado con la id ${testCart.id}`);
// // });
// routerCart.get("/:id/products", async (req, res) => {
//   const idParam = parseInt(req.params.id);
//   const cart = await controller.getCartById(idParam);

//   res.send(cart.products);
// });
// routerCart.delete("/:id", async (req, res) => {
//   const idParam = parseInt(req.params.id);
//   await controller.deleteCartById(idParam);
//   res.send(`carrito con ID: ${idParam} borrado`);
// });

// routerCart.post("/:id/products", async (req, res) => {
//   const idParam = parseInt(req.params.id);
//   const { body } = req;
//   const newPrdList = await controller.addPrdByCartId(body, idParam);

//   res.send(
//     `nuevo producto con ID: ${newPrdList.id} guardado en el carrito ${idParam}`
//   );
// });

// routerCart.delete("/:id/products/:idPrd", async (req, res) => {
//   const idCartParam = parseInt(req.params.id);
//   const idPrdParam = parseInt(req.params.idPrd);
//   const deleted = await controller.delPrdByCartId(idPrdParam, idCartParam);

//   res.send(`Producto con ID ${idPrdParam} Borrado del carrito ${deleted}`);
// });

// module.exports = routerCart;
