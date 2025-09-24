const express = require("express");
require("dotenv").config();

const app = express();

// Route رئيسية للتجربة
app.get("/", (req, res) => {
  res.send("✅ Server is working fine!");
});

// لازم ياخد البورت من Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(🚀 Server running on port ${PORT});
});
