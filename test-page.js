const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('正在访问 http://localhost:3000...');
  await page.goto('http://localhost:3000');

  console.log('页面标题:', await page.title());

  // 截图
  await page.screenshot({ path: 'homepage.png' });
  console.log('已保存截图: homepage.png');

  // 检查主要元素
  const h1 = await page.locator('h1').textContent();
  console.log('主标题:', h1);

  // 等待用户查看
  console.log('\n浏览器已打开，按 Ctrl+C 关闭');
  await page.waitForTimeout(60000);

  await browser.close();
})();
