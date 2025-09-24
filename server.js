const express = require("express");
require("dotenv").config();

const app = express();

// Route للتجربة
app.get("/", (req, res) => {
  res.send("✅ Server is working fine!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(🚀 Server running on port ${PORT});
});
