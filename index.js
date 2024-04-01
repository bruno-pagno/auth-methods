const express = require("express");
const authRoutes = require("./router");
const app = express();
const port = 3000;

app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
