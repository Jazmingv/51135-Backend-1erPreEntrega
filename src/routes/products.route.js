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
      status: "Bad Request",
      message: `The ID you requested (${productID}) doesn't exist. Please try again with an existing ID.`
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: productByID
    });
  }
});

ROUTER.post("/", (req, res) => {
  let newProduct = req.body;
  if (!newProduct.title || !newProduct.description || !newProduct.category || !newProduct.price || !newProduct.code || !newProduct.stock) {
    res.status(400).send({
      status: "Bad Request",
      message: "Fill in all the fields to add a new product."
    });
  } else {
    let createProduct = PRODUCTLIST.addProduct(newProduct);
    if (createProduct == false) {
        res.status(400).send({
            status: "Bad Request",
            message: `This code (${newProduct.code}) already exists`
          });
    }
    else {
        res.status(201).send({
            status: "Created",
            message: createProduct,
          });
      }
    }    
});

ROUTER.put("/:userId", (request, response) => {
  console.log("Consumiendo api PUT /api/user..");
  console.log(request.params);
  let userId = parseInt(request.params.userId);
  let userUpdated = request.body;
  console.log(`Buscando usuario a modificar por id: ${userId}`);
  const userPosition = users.findIndex((u) => u.id === userId);
  if (userPosition < 0) {
    return response
      .status(202)
      .send({ status: "info", error: "Usuario no encontrado" });
  }
  console.log("Usario encontrado para modificar:");
  console.log(users[userPosition]);
  userUpdated.id = users[userPosition].id;
  users[userPosition] = userUpdated;
  console.log("Usuarios actuales: ");
  console.log(users);
  return response.send({
    status: "Success",
    message: "Usuario Actualizado.",
    data: users[userPosition],
  }); //Si no se indica retorna status HTTP 200OK.
});

ROUTER.delete("/:userId", (request, response) => {
  console.log("Consumiendo api DELETE /api/user..");
  console.log(request.params);
  let userId = parseInt(request.params.userId);
  console.log(`Buscando usuario a eliminar por id: ${userId}`);
  const usersSize = users.length;
  const userPosition = users.findIndex((u) => u.id === userId);
  if (userPosition < 0) {
    return response
      .status(202)
      .send({ status: "info", error: "Usuario no encontrado" });
  }
  console.log("Usario encontrado para eliminar:");
  console.log(users[userPosition]);
  users.splice(userPosition, 1);
  if (users.length === usersSize) {
    return response
      .status(500)
      .send({ status: "error", error: "Usuario no se pudo borrar." });
  }
  return response.send({ status: "Success", message: "Usuario Eliminado." }); //Si no se indica retorna status HTTP 200OK.
});

export default ROUTER;
