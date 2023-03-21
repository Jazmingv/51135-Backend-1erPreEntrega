import { Router } from "express";
import ProductManager from "../classes/productManager.js";

const ROUTER = Router();
const PRODUCTLIST = new ProductManager();

ROUTER.get("/", (req, res) => {
  let { limit } = req.query;
  let totalProducts;
  if (!limit) {
    totalProducts = PRODUCTLIST.getProducts();
  } else {
    totalProducts = PRODUCTLIST.getProducts(limit);
  }
  res.status(200).send({
    status: "OK",
    message: totalProducts
  });
});

ROUTER.get("/:pid", (req, res) => {
  let productID = req.params.pid;
  let productByID = PRODUCTLIST.getProductById(productID);
  if (productByID == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The ID you requested (${productID}) doesn't exist. Please try again with an existing ID.`,
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: productByID,
    });
  }
});

ROUTER.post("/", (req, res) => {
  let newProduct = req.body;
  if (
    !newProduct.title ||
    !newProduct.description ||
    !newProduct.category ||
    !newProduct.price ||
    !newProduct.code ||
    !newProduct.stock
  ) {
    res.status(400).send({
      status: "Bad req",
      message: "Fill in all the fields to add a new product.",
    });
  } else {
    let createProduct = PRODUCTLIST.addProduct(newProduct);
    if (createProduct == false) {
      res.status(400).send({
        status: "Bad requested",
        message: `This code (${newProduct.code}) already exists`,
      });
    } else {
      res.status(201).send({
        status: "Created",
        message: createProduct,
      });
    }
  }
});

ROUTER.put("/:pid", (req, res) => {
  let productID = req.params.pid;
  let updatedFieldsProduct = req.body;
  let updateProduct = PRODUCTLIST.updateProduct(productID, updatedFieldsProduct);
  if (updateProduct == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The ID you requested (${productID}) doesn't exist. Please try again with an existing ID.`
    });
  } else {
    res.status(202).send({
      status: "Accepted",
      message: updateProduct
    });
  }
});

ROUTER.delete("/:pid", (req, res) => {
  let productID = req.params.pid;
  let productByID = PRODUCTLIST.deleteProduct(productID);
  if (productByID == false) {
    res.status(400).send({
      status: "Bad requested",
      message: `The ID you requested (${productID}) doesn't exist. Please try again with an existing ID.`,
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: productByID,
    });
  }
});

export default ROUTER;
