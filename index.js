import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { engine, create } from "express-handlebars";
import mongoose, { MongooseError } from "mongoose";
import * as dotenv from "dotenv"

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
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())

app.use(AuthRoutes)
app.use(ProductRoutes)


mongoose.connect("mongodb+srv://webcoder292:sysc2Ct3GnSjctJX@cluster0.cuwacpg.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
}, () => console.log("mongo db connected"));


const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

