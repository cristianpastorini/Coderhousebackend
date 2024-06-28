import FileSystem from "../utils/FileSystem.js";

export default class ProductManager {
    #filename;
    #fileSystem;

    constructor() {
        this.#filename = "products.json";
        this.#fileSystem = new FileSystem(this.#filename);
    }

    #generateId = (products) => {
        let highestID = 0;

        products.forEach((product) => {
            if (product.id > highestID) {
                highestID = product.id;
            }
        });

        return highestID + 1;
    };

    getAll = async () => {
        return await this.#fileSystem.read() ?? [];
    };

    getOneById = async (id) => {
        const products = await this.getAll();
        const product = products.find((item) => item.id === id);

        return product;
    };

    insertOne = async (data) => {
        const products = await this.getAll();

        const product = { id: this.#generateId(products), ...data };
        products.push(product);
        await this.#fileSystem.write(products);

        return product;
    };

    updateOneById = async (id, data) => {
        const products = await this.getAll();
        const product = products.find((item) => item.id === id);

        product.name = data.name;
        product.description = data.description;
        await this.#fileSystem.write(products);

        return product;
    };

    deleteOneById = async (id) => {
        const products = await this.getAll();
        const index = products.findIndex((item) => item.id === id);

        products.splice(index, 1);
        await this.#fileSystem.write(products);
    };
}