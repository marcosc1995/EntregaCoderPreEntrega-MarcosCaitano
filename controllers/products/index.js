const fs = require("fs");
class Products {
  constructor() {
    // this.filename = filename;
    this.products = this.readData();
    this.admin = true;
  }

  async readData() {
    try {
      const data = fs.readFileSync(`./products.txt`, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
  writeData(datos) {
    fs.writeFileSync(`./products.txt`, JSON.stringify(datos, null, 2));
  }
  async generateId() {
    const data = await this.productos;
    if (data.length === 0) {
      let id = 1;
      return id;
    }
    let id = data.map((produc) => produc.id);
    return Math.max(...id) + 1;
  }
  async generateDate() {
    const tiempoTrans = Date.now();
    const date = new Date(tiempoTrans);
    return date;
  }
  async getAll() {
    try {
      const data = await this.readData();
      //console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  async save(product) {
    try {
      this.productos = await this.readData();
      product.id = await this.generateId();
      const tiempoTrans = Date.now();
      const date = new Date(tiempoTrans);
      product.date = date.toUTCString();
      this.productos.push(product);
      this.writeData(this.productos);
      console.log(`${product.name} se guardo correctamente`);
      return product.id;
    } catch (e) {
      console.log(e);
    }
  }
  async deleteById(id) {
    try {
      const data = await this.readData();
      let itemToDelete = data.filter((item) => item.id !== id);
      this.writeData(itemToDelete);
      console.log(`El producto con ID: ${id} se borro correctamenta`);
    } catch (e) {
      console.log(e);
    }
  }
  async getById(id) {
    try {
      const data = await this.products;
      let itemToFind = data.find((item) => item.id === id);
      //console.log(itemToFind ? itemToFind : null);
      return itemToFind ? itemToFind : null;
    } catch (e) {
      console.log(e);
    }
  }
  async replaceById(newItem) {
    try {
      const data = await this.readData();
      const newProducts = data.map((item) => {
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
      //return newProducts;
      this.writeData(newProducts);
    } catch (error) {}
  }
  //   async save() {
  //     try {
  //       if (fs.existsSync(this.products)) {
  //         const data = await JSON.parse(fs.readFile(this.products, "utf-8"));
  //       } else {
  //         const data = [];
  //         const writeFile = fs.writeFileSync(
  //           ".products.txt",
  //           JSON.stringify(data)
  //         );
  //       }
  //     } catch (error) {}
  //   }
}

module.exports = Products;
