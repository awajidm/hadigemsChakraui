const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

const app = require("./app");

//env variable import
dotenv.config({ path: "backend/config/config.env" });

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down due to uncaught exceptions");
  process.exit(1);
});

//connect database
connectDatabase();

//setting up cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//starting server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server is up and running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//handling unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("server is shutting down due to unhandled rejection");

  server.close(() => {
    process.exit(1);
  });
});
