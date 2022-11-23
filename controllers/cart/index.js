const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor() {
    this.db = "./cart.txt";
  }
  writeData(datos, id) {
    fs.writeFileSync(`./cart${id}.txt`, JSON.stringify(datos, null, 2));
  }
  createCart(data, id) {
    fs.writeFileSync(`./cart${id}.txt`, JSON.stringify(data, null, 2));
  }
  deleteCart(id) {
    fs.unlink(`./cart${id}.txt`, function (err) {
      if (err) throw err;
      console.log(`Carrito ${id} Borrado!`);
    });
  }
  async addPrdByCartId(newPrd, id) {
    try {
      const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
      const prsData = JSON.parse(data);
      prsData.products.push(newPrd);
      this.writeData(prsData, id);
    } catch (error) {
      console.log(error);
    }
  }
  async delPrdByCartId(idPrd, id) {
    try {
      const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
      const prsData = JSON.parse(data);
      let newPrdList = prsData.products.filter((item) => item.id !== idPrd);
      prsData.products = newPrdList;
      this.writeData(prsData, id);
    } catch (error) {
      console.log(error);
    }
  }
  async getCartById(id) {
    try {
      const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
      console.log(JSON.parse(data));
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Cart;
