const express = require("express");

const app = express();
const PORT = 3002;

app.get("/health", (req, res) => {
  res.json({
    service: "product-service",
    status: "UP"
  });
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Laptop",
      price: 1200
    },
    {
      id: 2,
      name: "Mouse",
      price: 25
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});