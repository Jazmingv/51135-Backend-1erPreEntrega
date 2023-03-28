import fs from "fs";
import __dirname from "../utils.js";
import ProductManager from "./productManager.js";

const file = __dirname + "/json/carts.json";
const PRODUCTLIST = new ProductManager();

export default class cartManager {
  constructor() {
    this.filePath = file;
  }

  static id = 0;

  checkForFileAndReturnCarts = () => {
    let cartList = fs.readFileSync(this.filePath, "utf-8");
    this.carts = JSON.parse(cartList);
    cartManager.id = this.carts.length;
    return this.carts;
  };

  getCarts = (limit) => {
    this.carts = this.checkForFileAndReturnCarts();
    if (!limit) {
      return this.carts;
    } else {
      let cartsArray = [];
      for (let i = 0; i < limit; i++) {
        cartsArray.push(this.carts[i]);
      }
      return cartsArray;
    }
  };

  getCartById = (id) => {
    this.carts = this.checkForFileAndReturnCarts();
    const cartByID = this.carts.filter((cart) => cart.id == id);
    if (!cartByID || cartByID.length == 0) {
      return false;
    } else {
      return cartByID;
    }
  };

  addCart = (products) => {
    this.carts = this.checkForFileAndReturnCarts();
    cartManager.id++;
    let cart = {
      id: cartManager.id,
      products: products,
    };
    this.carts.push(cart);
    fs.writeFileSync(this.filePath, JSON.stringify(this.carts));
    return this.carts;
  };

  addProductToCart = (cartID, productID) => {
    this.carts = this.checkForFileAndReturnCarts();
    let getCart;
    for (let i= 0; i < this.carts.length; i++) {
      if (this.carts[i].id == cartID) {
        getCart = this.carts[i];
      }
    };
    if (!getCart) {
      return false;
    } else {
      let productsList = getCart.products;
      let prod;
      for (let i= 0; i < productsList.length; i++) {
        if (productsList[i].id == productID) {
          prod = productsList[i];
        }
      };
      if (!prod) {
        let singleProduct = {
          id: productID,
          quantity: 1
        };
        productsList.push(singleProduct);
      } else {
        prod.quantity++;
      }
    }
    fs.writeFileSync(this.filePath, JSON.stringify(this.carts));
    return this.carts;
  };

  deletecart = (id) => {
    this.carts = this.checkForFileAndReturnCarts();
    const checkForID = this.carts.findIndex((cart) => cart.id == id);

    if (checkForID > -1) {
      this.carts.splice(checkForID, 1);
      fs.writeFileSync(this.filePath, JSON.stringify(this.carts));
      return this.carts;
    } else {
      return false;
    }
  };
}
