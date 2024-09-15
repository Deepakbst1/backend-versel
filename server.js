const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");



//cors configuration
const app = express();
app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Constants
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

// API configuration
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({
      message: "Query parameter missing",
    });
  }
  if (typeof query !== "string") {
    return res.status(400).json({
      message: "Query parameter not a text",
    });
  }
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}&max=10`);
    return res.json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


app.get("/api/category", async (req, res) => {
  const category = req.query.category
  if (!category) {
    return res.status(400).json({
      message: "Category parameter missing",
    });
  }
  if (typeof category !== "string") {
    return res.status(400).json({
      message: "Category parameter not a text",
    });
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&max=10,lang=en`);
    return res.json({
      message: "success",
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
