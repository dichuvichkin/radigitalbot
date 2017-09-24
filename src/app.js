import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import routes from "./routes";

const app = express();

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressValidator());

app.use(cookieParser());

app.use('/', routes);



export default app;