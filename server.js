import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

dotenv.config();
const app = express();
app.use(express.static("public"));

app.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json({ hits: [] });

  const response = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(q)}`, {
    headers: { Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
  });
  const data = await response.json();
  res.json(data.response.hits);
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
