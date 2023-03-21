import { Router } from "express";
import CartManager from "../classes/cartManager.js";

const ROUTER = Router();
const CARTLIST = new CartManager();

ROUTER.get("/", (req, res) => {
  let { limit } = req.query;
  let totalCarts;
  if (!limit) {
    totalCarts = CARTLIST.getCarts();
  } else {
    totalCarts = CARTLIST.getCarts(limit);
  }
  res.status(200).send({
    status: "OK",
    message: totalCarts,
  });
});

ROUTER.get("/:cid", (req, res) => {
  let cartID = req.params.cid;
  let cartByID = CARTLIST.getCartById(cartID);
  if (cartByID == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The Cart ID you requested (${cartID}) doesn't exist. Please try again with an existing ID.`,
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: cartByID,
    });
  }
});

ROUTER.post("/", (req, res) => {
  let newCart = req.body;
  if (!newCart) {
    newCart.products = [];
  }
  let createCart = CARTLIST.addCart(newCart);
  res.status(201).send({
    status: "Created",
    message: createCart,
  });
});

ROUTER.post("/:cid/product/:pid", (req, res) => {
  let cart = req.params.cid;
  let product = req.params.pid;
  let addProduct = CARTLIST.addProductToCart(cart, product);
  if (addProduct == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The Cart ID you requested (${cartID}) doesn't exist. Please try again with an existing ID.`
    });
  } else {
    res.status(201).send({
      status: "Created",
      message: addProduct
    });
  }
});

ROUTER.delete("/:cid", (req, res) => {
  let cartID = req.params.pid;
  let cartByID = CARTLIST.deleteCart(cartID);
  if (cartByID == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The Cart ID you requested (${cartID}) doesn't exist. Please try again with an existing ID.`,
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: cartByID,
    });
  }
});

export default ROUTER;