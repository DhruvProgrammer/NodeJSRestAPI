//const { default: mongoose } = require("mongoose");
const { request } = require("express");
//const product=require("../model/product");
// const product = require("../model/product");
// const product = require("../model/product");
// const product = require("../model/product");
// const product = require("../model/product");
//get all produt
const Product = require("../model/product");  

// Get all products with filters
async function getAllProducts(req, res) {
  const { company, name, sort, select } = req.query;
  const query = {};

  if (company) {
    query.company = company;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  let apiResult = Product.find(query);

  if (sort) {
    let sortfix = sort.replace(",", " ");
    apiResult = apiResult.sort(sortfix);
  }

  if (select) {
    let selectfix = select.split(",").join(" ");
    apiResult = apiResult.select(selectfix);
  }

  const mydata = await apiResult;
  res.status(200).json({ nbHits: mydata.length, products: mydata });
}

// Get all products (testing)
const getAllProductsTesting = async (req, res) => {
  const mydata = await Product.find(req.query).select("name");
  console.log(req.query);
  res.status(200).json({ mydata });
};

// Create
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read one
const readProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
};

