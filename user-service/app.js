const express = require("express");

const app = express();
const PORT = 3001;

app.get("/health", (req, res) => {
  res.json({
    service: "user-service",
    status: "UP"
  });
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Alice" }
  ]);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});