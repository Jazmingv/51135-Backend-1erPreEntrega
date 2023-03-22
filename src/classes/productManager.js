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

  getProductById = (id) => {
    this.products = this.checkForFileAndReturnProducts();
    const productByID = this.products.filter((product) => product.id == id);
    if (!productByID || productByID.length == 0) {
      return false;
    } else {
      return productByID;
    }
  };

  addProduct = (
    title,
    category,
    description,
    price,
    code,
    stock,
    thumbnail,
    status
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
      thumbnail: thumbnail || "",
    };
    console.log(product);
    this.products.push(product);
    fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    return this.products;
  };

  updateProduct = (id, updatedProduct) => {
    this.products = this.checkForFileAndReturnProducts();
    let product = this.products.find((product) => product.id == id);
    if (product) {
      product.id = product.id;
      product.title = updatedProduct.title || product.title;
      product.category = updatedProduct.category || product.category;
      product.description = updatedProduct.description || product.description;
      product.price = updatedProduct.price || product.price;
      product.code = updatedProduct.code || product.code;
      product.stock = updatedProduct.stock || product.stock;
      product.status = updatedProduct.status || product.status;
      product.thumbnail = updatedProduct.thumbnail || product.thumbnail;

      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
      return this.products;
    } else {
      return false;
    }
  };

  deleteProduct = (id) => {
    this.products = this.checkForFileAndReturnProducts();
    const checkForID = this.products.findIndex((product) => product.id == id);

    if (checkForID > -1) {
      this.products.splice(checkForID, 1);
      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
      return this.products;
    } else {
      return false;
    }
  };
}
