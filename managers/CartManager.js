import FileSystem from "../utils/FileSystem.js";

export default class CartManager {
    #filename;
    #fileSystem;

    constructor() {
        this.#filename = "carts.json";
        this.#fileSystem = new FileSystem(this.#filename);
    }

    #generateId = (carts) => {
        let highestID = 0;

        carts.forEach((cart) => {
            if (cart.id > highestID) {
                highestID = cart.id;
            }
        });

        return highestID + 1;
    };

    getAll = async () => {
        return await this.#fileSystem.read() ?? [];
    };

    getOneById = async (id) => {
        const carts = await this.getAll();
        const cart = carts.find((item) => item.id === id);

        return cart;
    };

    insertOne = async (data) => {
        const carts = await this.getAll();

        const cart = { id: this.#generateId(carts), ...data };
        carts.push(cart);
        await this.#fileSystem.write(carts);

        return cart;
    };

    updateOneById = async (id, data) => {
        const carts = await this.getAll();
        const cart = carts.find((item) => item.id === id);

        cart.products = data.products;
        cart.observations = data.observations;
        await this.#fileSystem.write(carts);

        return cart;
    };

    deleteOneById = async (id) => {
        const carts = await this.getAll();
        const index = carts.findIndex((item) => item.id === id);

        carts.splice(index, 1);
        await this.#fileSystem.write(carts);
    };
}