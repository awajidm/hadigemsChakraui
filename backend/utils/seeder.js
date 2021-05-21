const Product = require("../models/product");
const connectDb = require("../config/database");
const dotenv = require("dotenv");

const data = require("../data/first100.json");

dotenv.config({ path: "backend/config/config.env" });

connectDb();

const DbSeeder = async () => {
  try {
    await Product.deleteMany();
    console.log("all collections deleted");

    await Product.insertMany(data);
    console.log("succesfully added!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

DbSeeder();
