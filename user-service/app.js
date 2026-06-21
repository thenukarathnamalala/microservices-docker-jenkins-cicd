const express = require("express");

const app = express();
const PORT = 3001;

const users = [
  { id: 1, name: "John", role: "Customer", status: "Active" },
  { id: 2, name: "Alice", role: "Admin", status: "Active" }
];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Service Dashboard</title>
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

        .badge {
          background: #dcfce7;
          color: #166534;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
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
      <div class="navbar">Microservices CI/CD Project</div>

      <div class="container">
        <div class="header">
          <h1>User Service Dashboard</h1>
          <p class="status">Service Status: Running Successfully</p>
          <p>This service is deployed on AWS EC2 using Docker and Jenkins CI/CD.</p>

          <div class="pipeline">
            GitHub → Jenkins → Docker Hub → AWS EC2
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td><span class="badge">${user.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div class="footer">
          API endpoint available at /users
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    service: "user-service",
    status: "UP"
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});