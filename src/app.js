import express from 'express';
import productsRoute from './routes/products.route.js';
import cartsRoute from './routes/carts.route.js';

const APP = express();
const PORT = 8080;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

APP.use('/api/products', productsRoute);
APP.use('/api/carts', cartsRoute);

APP.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});