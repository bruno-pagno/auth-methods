const express = require("express");
const app = express();
const port = 3000;

function basicAuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return unauthorized(res);

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString();
  const [username, password] = credentials.split(":");

  // Example of username and password
  // YWRtaW46cGFzc3dvcmQ= for admin:password for the enconded base64 version of it
  if (username === "admin" && password === "password") {
    next();
  } else {
    return unauthorized(res);
  }
}

function unauthorized(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Example"');
  return res.status(401).send("Unauthorized");
}

app.get("/protected", basicAuthMiddleware, (req, res) => {
  res.send("Basic authentication worked");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
