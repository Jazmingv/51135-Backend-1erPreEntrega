import fs from "fs";
import __dirname from "../utils.js";

const file = __dirname + "/json/products.json";

export default class ProductManager {
  constructor() {
    this.filePath = file;
  }

  static id = 0;

  checkForFileAndReturnProducts = () => {
    let productList = fs.readFileSync(this.filePath, "utf-8");
    this.products = JSON.parse(productList);
    ProductManager.id = this.products.length;
    return this.products;
  };

  getProducts = (limit) => {
    this.products = this.checkForFileAndReturnProducts();
    if (!limit) {
      return this.products;
    } else {
      let productsArray = [];
      for (let i = 0; i < limit; i++) {
        productsArray.push(this.products[i]);
      }
      return productsArray;
    }
  };

  addProduct = (
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    status,
    stock
  ) => {
    this.products = this.checkForFileAndReturnProducts();
    const checkForDuplicatedCode = this.products.filter(
      (product) => product.code === code
    );
    if (checkForDuplicatedCode.length !== 0) {
      return false;
    }
    ProductManager.id++;
    let product = {
      id: ProductManager.id,
      title: title,
      category: category,
      description: description,
      price: price,
      code: code,
      stock: stock,
      status: status || true,
      thumbnail: thumbnail || ""
    };
    this.products.push(product);
    fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    return this.products;
  };

  updateProduct = (id, updatedProduct) => {
    this.products = this.checkForFileAndReturnProducts();
    let product = this.products.find((product) => product.id == id);
    if (product) {
      product.title = updatedProduct.title || product.title;
      product.description = updatedProduct.description || product.description;
      product.price = updatedProduct.price || product.price;
      product.thumbnail = updatedProduct.thumbnail || product.thumbnail;
      product.stock = updatedProduct.stock || product.stock;
      product.id = product.id;

      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
      return this.products;
    } else {
      console.log(`This ID (${id}) does not exist.`);
      return this.products;
    }
  };

  deleteProduct = (id) => {
    this.products = this.checkForFileAndReturnProducts();
    const checkForID = this.products.findIndex((product) => product.id === id);

    if (checkForID > -1) {
      this.products.splice(checkForID, 1);
      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
      return this.products;
    } else {
      return `ID (${id}) not found or invalid`;
    }
  };

  getProductById = (id) => {
    this.products = this.checkForFileAndReturnProducts();
    const productByID = this.products.filter((product) => product.id == id);
    if (!productByID || productByID.length == 0) {
      return false;
    } else {
      return productByID;
    }
  };
}
