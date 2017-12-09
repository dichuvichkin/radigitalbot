import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import errorHandler from "errorhandler";
import { initTelegram } from "./Telegram/helpers";
// import sequelize, { Group, Promo } from "./models";
import { tgRoutes, vkRoutes } from "./routes";
// import { developmentErrors } from "./Shared/errorHandlers";

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

console.log(initTelegram());
// sequelize.sync();

// Group.sync({ force: true });

// Promo.sync({ force: true });

app.use(`/${process.env.TG_TOKEN}`, tgRoutes);
app.use("/vkRoute", vkRoutes);

if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandler());
}

export default app;
