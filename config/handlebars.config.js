import handlebars from "express-handlebars";
import path from "../utils/path.js";

const config = (serverHTTP) =>{
    serverHTTP.engine("handlebars", handlebars.engine()); //configuracion de handlebars
    serverHTTP.set("views", path.views);
    serverHTTP.set("view engine", "handlebars");
};

export default { config };