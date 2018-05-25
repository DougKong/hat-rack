const puppeteer = require('puppeteer');

const configurations = {
  headless: false
};

const oneSecond = 1000;
const cycles = 4;
const websites = ['nyt.com', 'wsj.com', 'nymag.com'];
const timeBrowserOpen = 100 * oneSecond;
const timeForBrowserShutdown = 10 * oneSecond;
const timeOnPage = (timeBrowserOpen - timeForBrowserShutdown)
                      / (cycles * websites.length);

(async () => {
  const browser = await puppeteer.launch(configurations);
  const page = await browser.newPage();

  let index = 0;
  let cycleCount = 0;

  setInterval(() => {
    if (cycleCount < cycles) {
      page.goto(`https://${websites[index]}`)
        .catch((error) => {
          console.error('error:', error);
        });

      cycleCount++;
      index = index + 1 < websites.length ? index + 1 : 0;
    }
  }, timeOnPage);

  setTimeout(() => {
    browser.close();
  }, timeBrowserOpen);

})();