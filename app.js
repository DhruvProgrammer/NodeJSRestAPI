require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const Fuse=require("fuse.js")
const products = require("./products.json");

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

const fuse=new Fuse(products,{
  keys:["name","compnay"],
  threshold: 0.3
});

app.get("/search",(req,res) => {
  const query=req.query.q;
  if(!query){
    return res.status(400).json({error: "provide a serch  query"})
  } 
const result =fuse.search(query);
res.json(result.map(r=>r.item))
});
start();
