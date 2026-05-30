"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    app = (0, express_1.default)();
    port;
    publicPath;
    routes;
    constructor(options) {
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }
    async start() {
        //*Midelware: son las funciones que se ejecutan antes de llegar a las rutas, pueden ser usadas para validar, autenticar, etc. */
        //*public ffolder
        this.app.use(express_1.default.static(this.publicPath));
        //*ROUTES
        this.app.use(this.routes);
        this.app.get("/{*splat}", (req, res) => {
            console.log("Request received: ", req.url);
            const indexPath = path_1.default.join(__dirname, `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });
        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map