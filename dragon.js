const puppeteer = require('puppeteer');
const {
  login,
  submit,
  terminate,
  purchase,
  cancelOrder,
} = require('./common.js');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  });
  const page = await browser.newPage();

  // As a seller, I could submit a new merchandise.
  await login({ id: 'seller', page });
  const merchandiseId = await submit({ page });
  console.log(`merchandiseId: ${merchandiseId}`);
  await page.screenshot({ path: 'screenshot/submit-ok.png', fullPage: true });

  // As a buyer, I could purchase merchandise.
  await login({ id: 'buyer', page });
  const orderId = await purchase({ merchandiseId, page });
  console.log(`orderId: ${orderId}`);
  await page.screenshot({ path: 'screenshot/payok.png', fullPage: true });

  // As a buyer, I could cancel order.
  await cancelOrder({ orderId, page });
  await page.screenshot({ path: 'screenshot/cancelOrder.png', fullPage: true });

  // As a seller, I could terminate merchandise.
  await login({ id: 'seller', page });
  await terminate({ merchandiseId, page });
  await page.screenshot({ path: 'screenshot/ternimate.png', fullPage: true });

  await browser.close();
})();
