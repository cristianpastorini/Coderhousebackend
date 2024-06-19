const socket = io();

socket.on("connect", ()=> {
    console.log("conectado al servidor");
});

socket.emit("saludo", { message: "Hola servidor" });

socket.on("saludo-respuesta", (data)=> {
    console.log(data.message);
});

socket.on("disconnect", () => {
    console.log("Se desconecto un server");
});