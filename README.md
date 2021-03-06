# TW Yahoo Auction Automation

This is an automation (pupeteer) for TW Yahoo Auction. It will go through the following steps.

1. As a **seller**, I could submit a new merchandise.
2. As a **buyer**, I could purchase merchandise.
3. As a **buyer**, I could cancel an order.
4. As a **seller**, I could terminate merchandise.

[![og_19](https://user-images.githubusercontent.com/10822546/149465481-03046d6e-2b99-42fe-937a-baacdb258a66.png)](https://www.youtube.com/watch?v=9GFPPKpQYbg)

## Getting Started

### Prepare Accounts

You will need to prepare TW Yahoo Auction accouts for buyer & seller. Than modify [common.js](https://github.com/meistudioli/yahoo-auction-automation/blob/main/common.js#L1-L10) accout information. (seller account needs to turn paytype:`7-11` on.)

```javascript
const account = {
  seller: {
    username: 'your_seller_username',
    password: 'your_seller_password',
    ecid: 'your_seller_ecid',
  },
  buyer: {
    username: 'your_buyer_username',
    password: 'your_buyer_password',
    ecid: 'your_buyer_ecid',
  }
};
```

### Installation

To use this automation, run:
```bash
npm install
```

### Execute

Execute script on the command line.
```bash
node dragon.js
```

## Reference
- [Demo > dragon](https://youtu.be/9GFPPKpQYbg)
- [Demo > minichat](https://youtu.be/W5ktoicnNMo)
- [First touch with Puppeteer](https://meistudio.medium.com/first-touch-with-puppeteer-801b0730c3)
- [Puppeteer](https://github.com/puppeteer/puppeteer)

