const puppeteer = require("puppeteer");
const chalk = require("chalk");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    const args = [
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ];

    const options = {
      args,
      headless: true,
      ignoreHTTPSErrors: true
    };

    // open the headless browser
    var browser = await puppeteer.launch(options);

    // open a new page
    var page = await browser.newPage();

    // enter url in page
    await page.goto(`https://www.gamestop.com/trade/details/?pid=10141928`);
    //class="product-detail product-wrapper trade-product-details"

    await page.screenshot({ path: "example.png" });

    //await page.waitForSelector("div.product-detail");

    const news = await page.evaluate(() => {
      return document
        .querySelector(
          "div.product-detail.product-wrapper.trade-product-details"
        )
        .getAttribute("data-gtmdata");
    });
    console.log(news);

    await browser.close();
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
