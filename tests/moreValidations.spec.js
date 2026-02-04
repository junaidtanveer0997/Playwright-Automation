const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test("Popup Validations", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());    // on("dialog") event listener to handle popup
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();       // hover on mouse hover element to display the hidden options

    // iframe or frameset tags are used to embed another HTML document within the current HTML document
    // frame handling in playwright is when we interact with elements inside an iframe
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    }) 