import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

const RESPONSE_MESSAGE_500 = "Hubo un error en el Servidor HTTP";
const RESPONSE_MESSAGE_400 = "Faltan datos para el producto";
const RESPONSE_MESSAGE_404 = "Producto no encontrado. ID incorrecto";

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200).json({ status: true, payload: products });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productFound = await productManager.getOneById(id);

        if (!productFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        res.status(200).json({ status: true, payload: productFound });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, price, code, category } = req.body;

        if (!name && !description && price && code && category) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const product = await productManager.insertOne({ name, description, price, code, category });

        res.status(201).json({ status: true, payload: product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, description, price, code, category } = req.body;

        if (!name && !description && price && code && category) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const id = Number(req.params.id);
        const productFound = await productManager.getOneById(id);

        if (!productFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        const product = await productManager.updateOneById(id, { name, description, price, code, category });

        res.status(200).json({ status: true, payload: product });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productFound = await productManager.getOneById(id);

        if (!productFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        await productManager.deleteOneById(id);

        res.status(200).json({ status: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

export default router;