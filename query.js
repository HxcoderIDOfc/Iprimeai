const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const prompt = process.argv[2] || "Halo";

(async () => {
  const executablePath = await chromium.executablePath;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath, // 🔥 INI YANG BENAR
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto("https://deepseek.com", { waitUntil: "networkidle2" });

  await page.waitForSelector('textarea');
  await page.type('textarea', prompt);
  await page.keyboard.press('Enter');

  await page.waitForSelector('.markdown', { timeout: 15000 });
  const result = await page.evaluate(() => {
    return document.querySelector('.markdown')?.innerText || "❌ Gagal ambil jawaban dari DeepSeek.";
  });

  console.log(result);
  await browser.close();
})();
