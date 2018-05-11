const puppeteer = require('puppeteer');

/** global: module **/

let instance;

module.exports = {
  getInstance: function() {
    if (!instance) {
      instance = new Promise((resolve) => {
        puppeteer.launch()
            .then(resolve);
      });
    }
    return instance;
  },
};
