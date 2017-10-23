import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import { initTelegram } from "./Telegram/Bot";
// import sequelize, { Group, Promo } from "./models";
import routes from "./routes";

const app = express();

app.use(compression());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(expressValidator());

app.use(cookieParser());

initTelegram();

// sequelize.sync();

// Group.sync({ force: true });

// Promo.sync({ force: true });

app.use("/", routes);

export default app;
