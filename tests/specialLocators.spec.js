const {test, expect} = require("@playwright/test");
const { only } = require("node:test");

test('Playwright Special Locators', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();   // Ensure that checkbox or radio element is checked.
    await page.getByLabel("Gender").selectOption("Male");   // select option from dropdown using label locator
    await page.getByPlaceholder("Password").fill("abc1234");   // fill input field using placeholder locator
    await page.getByRole("button", {name: "Submit"}).click();   // click button using role locator
    const successMsg = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log("Success message visible: " + successMsg);
    expect(successMsg).toBeTruthy();   // assertion to verify that success message is visible
    await page.getByRole("link", {name: "Shop"}).click();   // click on Shop link using role locator
    
    // chaining locators is when we combine multiple locators to narrow down the search for an element
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();   // locate product card using filter and click Add to Cart button

})