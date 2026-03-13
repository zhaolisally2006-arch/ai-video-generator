const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const pages = [
    { url: 'http://localhost:3000', name: 'home' },
    { url: 'http://localhost:3000/settings', name: 'settings' },
    { url: 'http://localhost:3000/create', name: 'create' },
  ];

  for (const p of pages) {
    console.log(`截图: ${p.name}`);
    await page.goto(p.url);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshot-${p.name}.png`, fullPage: true });
  }

  await browser.close();
  console.log('所有截图完成');
})();
