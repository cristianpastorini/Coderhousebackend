/* import express from "express";
import path from "./utils/path.js";
import { ProductManager } from "./Manager/productManager.js";
import { CartManager } from "./Manager/cartManager.js";
import { cartsRouter } from "./routes/carts.router.js";
import { productosRouter } from "./routes/productos.router.js";
import serverSocketIO from "./config/socket.config.js";
import configHandlebars from "./config/handlebars.config.js";
import { productsRouter } from "./routes/products.router.js";

const PORT = 8080;
const HOST = "localhost"; // 127.0.0.1
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use("/api/public", express.static(path.public));
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/productos", productosRouter);

const serverHTTP = app.listen(PORT, () => {
    console.log(`ejecutándose en http://${HOST}:${PORT}`);
});

configHandlebars.config(app);
serverSocketIO.config(serverHTTP); */

import express from "express";
import path from "./utils/path.js";
import { ProductManager } from "./Manager/productManager.js";
import { CartManager } from "./Manager/cartManager.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import serverSocketIO from "./config/socket.config.js";
import configHandlebars from "./config/handlebars.config.js";

const PORT = 8080;
const HOST = "localhost"; // 127.0.0.1
const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

//Declaración de ruta estática
app.use("/api/public", express.static(path.public));

//Declaración de rutas
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

//Control de errores internos
app.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

//Método oyente de solicitudes
const serverHTTP = app.listen(PORT, () => {
    console.log(`ejecutándose en http://${HOST}:${PORT}`);
});

//Configuración de motor de plantillas
configHandlebars.config(app);
serverSocketIO.config(serverHTTP);