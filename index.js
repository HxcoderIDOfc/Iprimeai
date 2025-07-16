const express = require('express');
const { exec } = require('child_process');
const app = express();

// API endpoint utama
app.get('/query', (req, res) => {
  const prompt = req.query.prompt || "Halo";

  exec(`node query.js "${prompt}"`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ ERROR:", stderr);
      return res.json({ reply: "❌ Error scraping DeepSeek. Coba lagi nanti ya kak." });
    }

    const reply = stdout.trim();
    res.json({ reply });
  });
});

// Endpoint root (biar bisa di-ping uptime robot)
app.get('/', (req, res) => res.send("🔥 IprimeAi is alive and ready!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ IprimeAi running on port ${PORT}`);
});
