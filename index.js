const express = require("express");
const { basicAuthMiddleware, jwtAuthMiddleware } = require("./middlewares/middlewares");
const app = express();
const port = 3000;

app.get("/basic-protected", basicAuthMiddleware, (req, res) => {
  res.send("Basic authentication succeeded");
});

app.get("/jwt-protected", jwtAuthMiddleware, (req, res) => {
  res.send("JWT authentication succeeded");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
