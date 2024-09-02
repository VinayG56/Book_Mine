const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const user = require("./routes/user");
const book = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);

app.get("/", (req, res) => {
  res.send("Hello there: Backend!");
});

app.listen(process.env.PORT, () => {
  console.log(`server started at ${process.env.PORT}`);
});
