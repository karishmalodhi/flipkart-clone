const authRoutes=require("./routes/authRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");
const productRoutes = require("./routes/productRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/flipkartClone")
  .then(() => console.log("MongoDB connected 🚀"))
  .catch(err => console.log("MongoDB error ❌", err));

// home route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// ADD SINGLE PRODUCT
app.get("/add", async (req, res) => {
  try {
    await Product.create({
      name: "iPhone 15",
      price: 70000,
      image: "https://example.com/phone.jpg",
      description: "Latest Apple iPhone"
    });

    res.send("Product added 🚀");
  } catch (err) {
    res.send(err.message);
  }
});

// SEED MULTIPLE PRODUCTS
app.get("/seed", async (req, res) => {
  try {
    await Product.insertMany([
      {
        name: "iPhone 15",
        price: 70000,
        image:  "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
               description: "Apple phone"
      },
      {
        name: "HP Laptop",
        price: 55000,
        image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
        description: "HP laptop"
      },
      {
        name: "Boat Headphones",
        price: 1999,
        image: "https://m.media-amazon.com/images/I/61u1VALn6JL._SX679_.jpg",
        description: "Music headphones"
      }
    ]);

    res.send("Seed done 🚀");
  } catch (err) {
    res.send(err.message);
  }
});

// API ROUTES (ONLY ONCE)
app.use("/api/products", authroutes);
app.use("/api/products",productRoutes);

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});