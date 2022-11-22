const fs = require("fs");
class Products {
  constructor() {
    // this.filename = filename;
    this.products = this.readData();
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
  async save(product) {
    try {
      this.productos = await this.readData();
      product.id = await this.generateId();
      this.productos.push(product);
      this.writeData(this.productos);
      console.log(`${product.name} se guardo correctamente`);
      return product.id;
    } catch (e) {
      console.log(e);
    }
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



module.exports = Products