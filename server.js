import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Server is working fine!");
});

// أهم حاجة هنا 👇
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(🚀 Server running on port ${PORT});
});

// Scraping lyrics endpoint
app.get("/lyrics", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ lyrics: "" });
  try {
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);
    const lyrics = $('[data-lyrics-container="true"]').text();
    res.json({ lyrics });
  } catch (err) {
    res.json({ lyrics: "", error: err.toString() });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running on port " + (process.env.PORT || 3000))
);
