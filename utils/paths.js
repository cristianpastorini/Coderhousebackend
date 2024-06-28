import path from "path";

const paths = {
    root: path.dirname(""),
    src: path.join(path.dirname(""), "src"),
    public: path.join(path.dirname(""), "public"),
    views: path.join(path.dirname(""), "views"),
    files: path.join(path.dirname(""), "data"),
};

export default paths;