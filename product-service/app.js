const express = require("express");

const app = express();
const PORT = 3002;

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: "$1200"
  },
  {
    id: 2,
    name: "Mouse",
    category: "Accessories",
    price: "$25"
  }
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Product Service Dashboard</title>

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
          margin: 0;
          color: #2563eb;
        }

        .status {
          margin-top: 12px;
          color: #16a34a;
          font-weight: bold;
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
          <h1>Product Service Dashboard</h1>

          <p class="status">
            Service Status: Running Successfully
          </p>

          <p>
            This service manages product information and is deployed on AWS EC2 using Docker and Jenkins CI/CD.
          </p>

          <div class="pipeline">
            GitHub → Jenkins → Docker Hub → AWS EC2
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            ${products.map(product => `
              <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
              </tr>
            `).join("")}
          </tbody>

        </table>

        <div class="footer">
          API endpoint available at /products
        </div>

      </div>

    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    service: "product-service",
    status: "UP"
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});