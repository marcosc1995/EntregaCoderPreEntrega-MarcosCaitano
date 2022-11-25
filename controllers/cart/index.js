const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Cart {
  constructor() {
    this.carts = this.readData("carts");
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
  async readData() {
    try {
      const data = fs.readFileSync(`./carts.txt`, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
  writeData(datos) {
    fs.writeFileSync(`./carts.txt`, JSON.stringify(datos, null, 2));
  }
  async saveCart(data) {
    try {
      this.carts = await this.readData();
      const cart = {}
      cart.id = await this.generateId(this.carts);
      cart.date = this.generateDate()
      cart.products = []
      data.id = await this.generateId(cart.products)
      cart.products.push(data)      
      this.carts.push(cart);
      this.writeData(this.carts);
      console.log(`Carrito con ID: ${cart.id} se guardo correctamente`);
      return cart.id;
    } catch (e) {
      console.log(e);
    }
  }
  // async saveCart(data) {
  //   try {
  //     this.carts = await this.readData();
  //     data.id = await this.generateId(this.carts);
  //     const tiempoTrans = Date.now();
  //     const date = new Date(tiempoTrans);
  //     data.date = date.toUTCString();
  //     this.carts.push(data);
  //     this.writeData(this.carts);
  //     console.log(`Carrito con ID: ${data.id} se guardo correctamente`);
  //     return data.id;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  async deleteCartById(id) {
    try {
      const data = await this.readData();
      let newCartList = data.filter((item) => item.id !== id);
      this.writeData(newCartList);
      console.log(`El Carrito con ID: ${id} se borro correctamenta`);
    } catch (e) {
      console.log(e);
    }
  }
  async getCartById(id) {
    try {
      const data = await this.readData();
      let itemToFind = data.find((item) => item.id === id);
      //console.log(itemToFind ? itemToFind : null);
      return itemToFind ? itemToFind : null;
    } catch (e) {
      console.log(e);
    }
  }
  async addPrdByCartId(newPrd, id) {
    const newCart = await this.getCartById(id)
    newPrd.id = await this.generateId(newCart.products)
    newPrd.date = this.generateDate()
    newCart.products.push(newPrd)
    const newCartList = await this.replaceById(newCart)
    //const data = await this.readData()
    return newPrd    
  }
  async delPrdByCartId(idPrd ,id) {
    const newCart = await this.getCartById(id)
    const newCartList = await this.deleteById(newCart.products, idPrd)
    const listToLoad = {}
    listToLoad.products = newCartList
    listToLoad.id = id
    listToLoad.date = this.generateDate()
    console.log(listToLoad)
    this.replaceById(listToLoad)
    return listToLoad.id   
     
  }
  async replaceById(newItem) {
    try {
      const data = await this.readData();
      const newList = data.map((item) => {
        if (item.id === newItem.id) {
          item = newItem;
          const tiempoTrans = Date.now();
          const date = new Date(tiempoTrans);
          item.date = date.toUTCString();
          return item;
        } else {
          return item;
        }
      });
      //return newList;
      this.writeData(newList);
      return newList
    } catch (error) {}
  }
  async deleteById(arr, id) {
    try {
      const data = arr;
      let newArr = data.filter((item) => item.id !== id);
      console.log(`El producto con ID: ${id} se borro correctamenta`);
      return newArr
    } catch (e) {
      console.log(e);
    }
  }
  // createCart(data, id) {
  //   fs.writeFileSync(`./cart${id}.txt`, JSON.stringify(data, null, 2));
  // }
  // deleteCart(id) {
  //   fs.unlink(`./cart${id}.txt`, function (err) {
  //     if (err) throw err;
  //     console.log(`Carrito ${id} Borrado!`);
  //   });
  // }
  // async addPrdByCartId(newPrd, id) {
  //   try {
  //     const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
  //     const prsData = JSON.parse(data);
  //     newPrd.id = await this.generateId(prsData.products);
  //     newPrd.date = this.generateDate()
  //     prsData.products.push(newPrd);
  //     this.writeData(prsData, id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async delPrdByCartId(idPrd, id) {
  //   try {
  //     const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
  //     const prsData = JSON.parse(data);
  //     let newPrdList = prsData.products.filter((item) => item.id !== idPrd);
  //     prsData.products = newPrdList;
  //     this.writeData(prsData, id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async getCartById(id) {
  //   try {
  //     const data = fs.readFileSync(`./cart${id}.txt`, "utf-8");
  //     console.log(JSON.parse(data));
  //     return JSON.parse(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = Cart;
