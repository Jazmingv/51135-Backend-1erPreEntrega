import express from 'express';
import ProductManager from './productManager.js';
import { dirname } from 'path';

const APP = express();
const PORT = 8080;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

APP.get('/', (req, res) => {
    res.send(`Hola Gasty! Este es el desafío de la Clase N°6!`)
})

APP.get('/products', (req, res) => {
    let { limit } = req.query;
    let productList;
    if (!limit) {
        productList = new ProductManager().getProducts();
    } else {
        productList = new ProductManager().getProducts(limit);
    }
    res.send(productList);
});


APP.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})