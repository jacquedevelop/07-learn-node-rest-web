import express, { Router } from "express";
import path from "path";


interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  private app = express();
    private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port, public_path = 'public', routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {


    //*Midelware: son las funciones que se ejecutan antes de llegar a las rutas, pueden ser usadas para validar, autenticar, etc. */
    this.app.use(express.json()); // RAW
    this.app.use(express.urlencoded({extended: true})); // X.WWW-ENCODEC


    //*public ffolder
    this.app.use(express.static(this.publicPath));



    //*ROUTES
    this.app.use(this.routes);
   

    this.app.get("/{*splat}", (req, res) => {
     console.log("Request received: ", req.url);
     const indexPath = path.join(__dirname, `../../../${this.publicPath}/index.html`);
     res.sendFile(indexPath);
     return;
    });




    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });
  }
}
