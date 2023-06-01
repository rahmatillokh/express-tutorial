import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { engine, create } from "express-handlebars";
import * as dotenv from "dotenv"
import { connect } from "mongoose"


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


connect("mongodb+srv://webcoder292:4QfeF4G2ioE2YdDC@cluster0.cuwacpg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('Connected Successfully'))
  .catch(error => console.log('Failed to connect', error))


const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

