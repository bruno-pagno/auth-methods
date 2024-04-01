const express = require("express");
const router = new express.Router();
const { basicAuthMiddleware, jwtAuthMiddleware } = require("./middlewares/middlewares");

router.get("/basic-protected", basicAuthMiddleware, (req, res) => {
  res.send("Basic authentication succeeded");
});

router.get("/jwt-protected", jwtAuthMiddleware, (req, res) => {
  res.send("JWT authentication succeeded");
});

module.exports = router;
