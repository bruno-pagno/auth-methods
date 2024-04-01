const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const JWT_SECRET = "lorem";

function basicAuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return unauthorized(res);

  const [prefix, base64Credentials] = authHeader.split(" ")[1];
  if (prefix !== "Basic") return res.status(401).send("Invalid Token prefix");

  const credentials = Buffer.from(base64Credentials, "base64").toString();
  const [username, password] = credentials.split(":");

  // YWRtaW46cGFzc3dvcmQ= for admin:password for the enconded base64 version of it
  if (username === "admin" && password === "password") {
    next();
  } else {
    return unauthorized(res);
  }
}

function jwtAuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return unauthorized(res);

  const [prefix, token] = authHeader.split(" ");
  if (prefix !== "Bearer") return res.status(401).send("Invalid Token prefix");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

function unauthorized(res) {
  return res.status(401).send("Unauthorized");
}

app.get("/basic-protected", basicAuthMiddleware, (req, res) => {
  res.send("Basic authentication succeeded");
});

app.get("/jwt-protected", jwtAuthMiddleware, (req, res) => {
  res.send("JWT authentication succeeded");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
