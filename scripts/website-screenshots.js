// Maakt lange (full-page) screenshots van websites voor de laptop-mockups.
// Gebruik: node scripts/website-screenshots.js  → schrijft naar public/sites/<naam>.png
// Daarna omzetten naar webp (1440 breed), zie CLAUDE.md.
const { chromium } = require("playwright");
const sites = [
  ["jaja-b2b", "https://jaja.net/"],
  ["jaja-b2c", "https://jajashop.com/"],
  ["bigpush", "https://www.bigpush.nl/"],
  ["santani", "https://santani.vercel.app/"],
];
(async () => {
  const b = await chromium.launch();
  for (const [k, u] of sites) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(u, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(2500);
    await p.getByRole("button", { name: /yes, i am/i }).click({ timeout: 2000 }).catch(() => {});
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(H, 9000); y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(350); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
    const h = Math.min(await p.evaluate(() => document.documentElement.scrollHeight), 9000);
    await p.screenshot({ path: `public/sites/${k}.png`, clip: { x: 0, y: 0, width: 1440, height: h }, fullPage: true });
    console.log(k, h);
  }
  await b.close();
})();
