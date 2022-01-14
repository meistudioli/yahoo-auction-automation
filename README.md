# TW Yahoo Auction Automation

This is an automation (pupeteer) for TW Yahoo Auction. It will go through the folllowing steps.

1. As a **seller**，I could submit a new merchandise.
2. As a **buyer**，I could purchase merchandise.
3. As a **buyer**，I could cancel an order.
4. As a **seller**，I could terminate merchandise.

## Getting Started

### Prepare Accounts

You will need to prepare TW Yahoo Auction accouts for buyer & seller. Than modify common.js accout information.

```javascript
const account = {
  seller: {
    username: 'your_seller_username',
    password: 'your_seller_password'
  },
  buyer: {
    username: 'your_buyer_username',
    password: 'your_buyer_password'
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
- [demo](https://www.youtube.com/watch?v=9GFPPKpQYbg)
- [Puppeteer](https://github.com/puppeteer/puppeteer)
