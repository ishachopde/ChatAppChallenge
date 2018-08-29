import * as express from "express";
import * as path from "path";
import favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import jwt from "./helpers/jwt";
import errorHandler from "./helpers/errorHandlers";
import routes from "./routes/index";
class App {
  public app;
  constructor() {
    this.app = express();
    this.intialiseApp();
    this.mountRoutes();
  }

  /**
   * Initialises the express App
   */
  private intialiseApp(): void {
    // view engine setup
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    // uncomment after placing your favicon in /public
    // this.app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "../../build")));
    this.app.use(cors());

    // use JWT auth to secure the api
    this.app.use(jwt());

    // global error handler
    this.app.use(errorHandler);
  }

  /**
   * Creates different routes for Apis and to serve react application.
   */
  private mountRoutes(): void {
    /* GET home page. */
    this.app.get("/", (req, res, next) => {
      res.render("index", { title: "Express" });
    });

    // api routes
    this.app.use("/users", routes);
  }
}

export default new App().app;
