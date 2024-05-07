const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/user");
const productRoutes = require("./routes/product");
const OrderRoutes = require("./routes/Order");
const cors = require('./middleware/cors');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors); // <--- Cambio aquí
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", productRoutes);
app.use("/api", OrderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my API Store");
});

app.listen(port, () => console.log("Server listening to", port));

