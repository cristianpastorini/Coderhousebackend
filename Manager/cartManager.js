
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
    constructor() {
        this.path = "data/cart.json";
        this.carts = [];
    }
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((cart) => cart.id === cartId);

        if (cartIndex !== -1) {
            const cartProducts = await this.getCartProducts(cartId);
            const existingProductIndex = cartProducts.findIndex((product) => product.product_id === productId);

            if (existingProductIndex !== -1) {
                cartProducts[existingProductIndex].quantity++;
            } else {
                cartProducts.push({ productId, quantity: 1 });
            }

            carts[cartIndex].products = cartProducts;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            console.log("Producto agregado exitosamente");
        } else {
            console.log("Producto no agregado", cartId);
        }
    }
    async getCarts() {
        try {
            const response = await fs.readFile(this.path, "utf8");
            const responseJSON = JSON.parse(response);
            return responseJSON;
        } catch (error) {
            console.error("Carrito no encontrado", error);
            return [];
        }
    }

    async getCartProducts(id) {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);
        if (cart) {
            return cart.products;
        } else {
            console.log("Carrito no encontrado:", id);
            return [];
        }
    }

    async newCart() {
        const id = uuidv4();
        const newCart = { id, products: [] };

        const carts = await this.getCarts();
        carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2)); // Pretty-print for readability
        return newCart;
    }
}