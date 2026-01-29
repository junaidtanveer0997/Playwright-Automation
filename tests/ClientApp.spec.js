const {test, expect} = require("@playwright/test");
const { only } = require("node:test");

test('Browser Context Playwright Test (Assignment)', async ({browser}) => {
    // test steps will go here
    const context = await browser.newContext();                    // this method creates a new browser context (fresh browser session)
    const page = await context.newPage();                               // this method creates a new page in the browser context
    const userEmail = page.locator('#userEmail');
    const pswd = page.locator('#userPassword');
    const loginBtn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");      // navigate to the URL
    console.log("Page title is: " + await page.title());
    // css, xpath selectors (helps to locate elements on the page)
    await userEmail.fill('junaidtanveer0997@gmail.com');          // fill method is used to enter text into input fields
    await pswd.fill('P@ssw0rd1!');                               // locate password field using attribute selector and fill it
    await loginBtn.click();                                        // click method is used to click on buttons/links
    await page.waitForLoadState('networkidle');                     // wait for network to be idle (all requests finished)
    const titles = await cardTitles.allTextContents();                    // get text contents of all matching elements
    console.log(titles);
    //console.log(await cardTitles.nth(0).textContent());               // get the text content of an element (used for verification)
    });