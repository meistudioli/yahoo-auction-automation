const account = {
  seller: {
    username: 'your_seller_username',
    password: 'your_seller_password',
  },
  buyer: {
    username: 'your_buyer_username',
    password: 'your_buyer_password',
  },
};

module.exports = {
  login: async ({ id, page }) => {
    const { username, password } = account[id];

    // clear cookies
    const client = await page.target().createCDPSession();
    await await client.send('Network.clearBrowserCookies');

    // input username & password
    await page.goto(
      'https://login.yahoo.com/m?.lg=tw&.intl=tw&.src=mktg1&.done=http://tw.bid.yahoo.com/status.html'
    );
    await page.waitForSelector('#login-username');
    await page.type('#login-username', username);
    await page.click('#login-signin');
    await page.waitForSelector('#login-passwd');
    await page.type('#login-passwd', password);
    await page.click('#login-signin');
    await page.waitForNavigation();
  },
  submit: async ({ page }) => {
    // page > select type
    await page.goto(
      'https://tw.bid.yahoo.com/partner/merchandise/select_type',
      { waitUntil: 'networkidle2' }
    );
    await page.click('input[data-ylk="hpp:generalSubmit;"]');
    await page.waitForNavigation();

    // page > select category
    await page.waitForSelector('[for="product-category-2"]');
    await page.click('[for="product-category-2"]');
    await page.waitForSelector('.history-category-list');
    await page.click('.history-category-list label');
    await page.click('.button-submit');
    await page.waitForNavigation();

    // disable multi-spec
    await page.focus('#create-specs');
    await page.$eval('#create-specs', (check) => {
      if (check.checked) {
        check.click();
      }
    });

    // fill basic information
    await page.type('[name="itemTitle"]', '測試商品請勿下標，所有訂單一律取消');
    await page.type('[name="itemBrief"]', '測試商品請勿下標，所有訂單一律取消');
    await page.type('[name="salePrice"]', '10000');
    await page.$eval('[name="totalQuantity"]', (input) => {
      input.value = 99;
    });

    // upload image
    await page.waitForSelector('.illuTrans .vanquish input[type=file]');
    const inputFile = await page.$('.illuTrans .vanquish input[type=file]');
    await inputFile.uploadFile('images/i_19_512x512.png');
    await page.waitForSelector('.illuTrans ul .vanquish input');

    // itemDesc
    await page.waitForSelector('#closure-editor');
    await page.click('#literalMode');
    await page.waitForSelector('[name="itemDesc"]');
    await page.type('[name="itemDesc"]', '測試商品請勿下標，所有訂單一律取消');

    // paytype - 711 only
    await page.$$eval('.gateway-pctc input', (inputs) => {
      inputs.map((input) => (input.checked = false));
    });
    await page.$eval('[name=".pctc_711cvs"]', (checkbox) => {
      checkbox.checked = true;
    });

    // shiptype
    await page.click('[for="useItemRule"]');
    await page.select('[name="shipType[0][type]"]', '.s7c');
    await page.type('[name="shipType[0][freight]"]', '60');

    await page.click('.browser-btn input[type="submit"]');
    await page.waitForNavigation();

    // page > preview
    await page.waitForSelector('.button-submit.button-main');
    await page.click('.button-submit.button-main');
    await page.waitForNavigation();

    // submit-success
    await page.waitForSelector('.submit-success');
    return await page.$eval('.submit-info a', (link) => {
      return link.href.replace(/.*\/(\d+)/, '$1');
    });
  },
  purchase: async ({ merchandiseId, page }) => {
    // todo: clear cart

    // item
    await page.goto(`https://tw.bid.yahoo.com/item/${merchandiseId}`, {
      waitUntil: 'networkidle2',
    });
    await page.waitForSelector('[class*="buyNowButton"]');
    await page.click('[class*="buyNowButton"]');
    await page.waitForNavigation();

    // cart
    await page.waitForSelector('[class*="checkoutButton"]');
    await page.click('[class*="shippingList"] label');
    await page.waitForSelector(
      '[class*=checkoutSummaryBarBox] [class*=priceBox]:not(:empty)'
    );
    await page.click('[class*="checkoutButton"]');
    await page.waitForNavigation();

    // checkout
    await page.waitForSelector('[class*="checkoutButton"]');
    await page.click('[class*="checkoutButton"]');
    await page.waitForNavigation();

    // payok
    const orderId = await page.evaluate(() => {
      return new URL(location.href).searchParams.get('orderId');
    });

    return orderId;
  },
  cancelOrder: async ({ orderId, page }) => {
    // order detail
    await page.goto(
      `https://tw.bid.yahoo.com/myauc/ordercancel?orderId=${orderId}`,
      { waitUntil: 'networkidle2' }
    );
    await page.tap('input[value="regret"]');
    await page.click('[class*="button-main"]');
    await page.waitForNavigation();
  },
  terminate: async ({ merchandiseId, page }) => {
    // item management
    await page.goto(
      `https://tw.bid.yahoo.com/partner/merchandise/list_merchandise?qtype=mid&qstr=${merchandiseId}&mtab=all`,
      { waitUntil: 'networkidle2' }
    );
    await page.click(`[name="mid"][value="${merchandiseId}"]`);
    await page.click(`#mlist_mutl_action_close`);
    await page.waitForSelector('.yui3-button.button-primary');
    await page.click(`.yui3-button.button-primary`);
    await page.waitForNavigation();
  },
};
