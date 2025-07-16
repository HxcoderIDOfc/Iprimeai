const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/query', (req, res) => {
  const prompt = req.query.prompt || "Halo";
  exec(`node query.js "${prompt}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.json({ reply: "❌ Error scraping DeepSeek." });
    }
    res.json({ reply: stdout.trim() });
  });
});

app.get('/', (req, res) => res.send("IprimeAi is alive 🔥"));
app.listen(3000, () => console.log("IprimeAi running on port 3000"));
