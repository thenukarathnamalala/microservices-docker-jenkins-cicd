const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3003;

app.get("/", async (req, res) => {

  let orders = [];
//check webhook
  try {

    const usersResponse =
      await axios.get("http://user-service:3001/users");

    const productsResponse =
      await axios.get("http://product-service:3002/products");

    const users = usersResponse.data;
    const products = productsResponse.data;

    orders = [
      {
        orderId: 1,
        customer: users[0].name,
        product: products[0].name,
        quantity: 2
      },
      {
        orderId: 2,
        customer: users[1].name,
        product: products[1].name,
        quantity: 1
      }
    ];

  } catch (error) {

    orders = [
      {
        orderId: 1,
        customer: "John",
        product: "Laptop",
        quantity: 2
      },
      {
        orderId: 2,
        customer: "Alice",
        product: "Mouse",
        quantity: 1
      }
    ];
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Service Dashboard</title>

      <style>

        body {
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          margin: 0;
          color: #1f2937;
        }

        .navbar {
          background: #111827;
          color: white;
          padding: 20px 50px;
          font-size: 22px;
          font-weight: bold;
        }

        .container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }

        .header {
          background: white;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          margin-bottom: 25px;
        }

        .header h1 {
          color: #2563eb;
          margin: 0;
        }

        .status {
          color: #16a34a;
          font-weight: bold;
          margin-top: 12px;
          font-size: 18px;
        }

        .pipeline {
          margin-top: 18px;
          background: #eff6ff;
          padding: 14px;
          border-left: 5px solid #2563eb;
          border-radius: 8px;
          font-weight: bold;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        th {
          background: #2563eb;
          color: white;
          text-align: left;
          padding: 16px;
        }

        td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .footer {
          margin-top: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }

      </style>
    </head>

    <body>

      <div class="navbar">
        Microservices CI/CD Project
      </div>

      <div class="container">

        <div class="header">
          <h1>Order Service Dashboard</h1>

          <p class="status">
            Service Status: Running Successfully
          </p>

          <p>
            This service aggregates data from User and Product services.
          </p>

          <div class="pipeline">
            GitHub → Jenkins → Docker Hub → AWS EC2
          </div>

        </div>

        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>

            ${orders.map(order => `
              <tr>
                <td>${order.orderId}</td>
                <td>${order.customer}</td>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
              </tr>
            `).join("")}

          </tbody>

        </table>

        <div class="footer">
          API endpoint available at /orders
        </div>

      </div>

    </body>
    </html>
  `);
});

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