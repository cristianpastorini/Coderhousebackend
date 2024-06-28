import { Router } from "express";
import CartManager from "../../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager();

const RESPONSE_MESSAGE_500 = "Hubo un error en el Servidor HTTP";
const RESPONSE_MESSAGE_400 = "Faltan datos para agregar el producto";
const RESPONSE_MESSAGE_404 = "Producto no encontrada. ID incorrecto";

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        res.status(200).json({ status: true, payload: carts });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cartFound = await cartManager.getOneById(id);

        if (!cartFoundFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        res.status(200).json({ status: true, payload: cartFound });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.post("/", async (req, res) => {
    try {
        const { observations } = req.body;

        const cart = await cartManager.insertOne({ products: [], observations });

        res.status(201).json({ status: true, payload: cart });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { products, observations } = req.body;

        if (!products) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const id = Number(req.params.id);
        const cartFound = await cartManager.getOneById(id);

        if (!cartFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        const cart = await cartManager.updateOneById(id, { products, observations });

        res.status(200).json({ status: true, payload: cart });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cartFound = await cartManager.getOneById(id);

        if (!cartFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        await cartManager.deleteOneById(id);

        res.status(200).json({ status: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

export default router;