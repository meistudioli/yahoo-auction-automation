const puppeteer = require('puppeteer');
const { login, submit, terminate } = require('./common.js');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768
    }
  });
  const page = await browser.newPage();

  // As a seller, I could submit new merchandise.
  await login({ id:'seller', page });
  const merchandiseId = await submit({ page });
  console.log('merchandiseId: '+merchandiseId);
  await page.screenshot({ path: 'screenshot/submit-ok.png', fullPage:true });

  // As a seller, I could terminate merchandise.
  await terminate({ merchandiseId, page });
  await page.screenshot({ path: 'screenshot/ternimate.png', fullPage:true });

  await browser.close();
})();