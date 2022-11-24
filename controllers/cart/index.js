const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor() {
    //this.db = "./cart.txt";
  }
  async generateId(arr) {
    const data = await arr;
    if (data.length === 0) {
      let id = 1;
      return id;
    }
    let id = data.map((produc) => produc.id);
    return Math.max(...id) + 1;
  }
  generateDate() {
    const tiempoTrans = Date.now();
    const date = new Date(tiempoTrans);
    const utc = date.toUTCString();
    return utc;
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
      newPrd.id = await this.generateId(prsData.products);
      newPrd.date = this.generateDate()
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
