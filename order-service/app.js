const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3003;

app.get("/health", (req, res) => {
  res.json({
    service: "order-service",
    status: "UP"
  });
});

app.get("/orders", async (req, res) => {
  try {
    const usersResponse =
        await axios.get("http://user-service:3001/users");

    const productsResponse =
        await axios.get("http://product-service:3002/products");

    const users = usersResponse.data;
    const products = productsResponse.data;

    const orders = [
      {
        orderId: 1,
        user: users[0],
        product: products[0],
        quantity: 2
      },
      {
        orderId: 2,
        user: users[1],
        product: products[1],
        quantity: 1
      }
    ];

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      error: "Unable to fetch data from services"
    });

  }
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});


