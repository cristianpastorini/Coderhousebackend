import { Server } from "socket.io";

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);
    serverIO.on("connection", (socket) => {
        const id = socket.client.id;
        console.log("Conexión establecida", id);

        socket.on("saludo", (data) => {
            console.log(data.message);

            serverIO.emit("saludo-respuesta", { message: "hola cliente" });
        });
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente", id);
        });
    });
};

export default { config };