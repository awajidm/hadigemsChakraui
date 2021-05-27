const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//import all routers
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const category = require("./routes/category");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", category);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
