const puppeteer = require('puppeteer');
const { login, chat } = require('./common.js');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  });
  const page = await browser.newPage();

  // As a buyer, I could chat with seller
  await login({ id:'buyer', page });
  await chat({ id:'seller', page });

  await page.screenshot({ path: 'minichat.png' });
  console.log('minichat test success.');

  await browser.close();
})();