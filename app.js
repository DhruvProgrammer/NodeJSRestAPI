require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");

const {
  getAllProducts,
  getAllProductsTesting,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
} = require("./control/products");

const app = express();
app.use(express.json());

// Routes
app.get("/api/products", getAllProducts);              // get all with filters
app.get("/api/products/testing", getAllProductsTesting); // testing route
app.post("/api/products", createProduct);              // create
app.get("/api/products/:id", readProduct);             // read one
app.put("/api/products/:id", updateProduct);           // update
app.delete("/api/products/:id", deleteProduct);        // delete

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
