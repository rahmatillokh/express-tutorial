import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { engine, create } from "express-handlebars";
import { connect } from "mongoose"
import flash from "connect-flash"
import cookieParser from "cookie-parser";
import session from "express-session";
import varMiddleWare from "./middleware/var.js";
import hbsHelper from "./utils/index.js"

import * as dotenv from "dotenv"

import Handlebars from "handlebars"
Handlebars.registerHelper('truncate', function (str, length) {
  if (str.length > length) {
    return str.slice(0, length) + '..';
  }
  return str;
});


// ROUTES
import AuthRoutes from "./routes/auth.js"
import ProductRoutes from "./routes/products.js"


dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: hbsHelper
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())
app.use(session({ secret: "Khon", resave: false, saveUninitialized: false }))
app.use(flash())
app.use(cookieParser())
app.use(varMiddleWare)
app.use(AuthRoutes)
app.use(ProductRoutes)


connect(process.env.MONGO_URL)
  .then(() => console.log('Connected Successfully'))
  .catch(error => console.log('Failed to connect', error))


const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

