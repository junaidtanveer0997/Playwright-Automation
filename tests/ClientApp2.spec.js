const {test, expect} = require("@playwright/test");
const { only } = require("node:test");

test('End to end project 2', async ({page}) => {        
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userloginEmail = 'dummyemailJunaid@hotmail.com';
    const passwordValue = 'P@ssw0rd1!';
    const productName = 'IPHONE 13 PRO';

    // login page
    await page.getByPlaceholder("email@example.com").fill(userloginEmail);
    await page.getByPlaceholder("enter your passsword").fill(passwordValue);
    await page.getByRole("button", {name: "Login"}).click();
    console.log("✅End to end login test completed successfully.");

    // products page
    await page.waitForLoadState('networkidle');              // wait for network to be idle (all requests finished)
    await page.locator(".card-body b").first().waitFor();    // wait for the first product card to be visible
    await page.locator(".card-body").filter({hasText: productName})
          .getByRole("button", {name: " Add To Cart"}).click();
    console.log("✅Product added to cart: " + productName);

    // find and click on cart button
    await page.getByRole("listitem").getByRole("button", {name: "  Cart "}).click();
    console.log("✅Navigated to cart page.");

    // assertion to verify that the selected item is in the cart and checkout
    await page.locator("div li").first().waitFor();             // wait for the first cart item to be visible
    await expect(page.getByText(productName)).toBeVisible();    // assertion to verify that product is visible in cart
    console.log("✅Assertion passed: Item is visible in the cart.");
    await page.getByRole("button", {name: "Checkout"}).click();
    console.log("✅landed on checkout page.");

    // fill checkout page credentials
    await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay:100});
    await page.locator(".ta-results").waitFor();                  // wait for the dropdown to appear
    await page.getByRole("button", {name: " India"}).click();
    console.log("✅Country selected: India");
    await page.getByText("Place Order ").click();
    // updated till here



    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();                                          // wait for the dropdown to appear
    const optionCount = await dropdown.locator("button").count();
    console.log("Number of suggestions: " + optionCount);
    for (let i = 0; i < optionCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    // assertion to verify that correct email address is selected (using parent to child traversing)
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userloginEmail);

    //await page.locator('button.ta-item').filter({hasText: /^\s*India\s*$/}).click();  // select India from suggestions
    await couponCode.fill('rahulshettyacademy');
    await couponApplyBtn.click();
    await placeOrderBtn.click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    console.log("✅Order placed successfully.");

    // extract order id from confirmation page
    const orderIdInitial = await page.locator('td.em-spacer-1 label.ng-star-inserted').textContent();
    const orderId = orderIdInitial.replace(/[\s|]/g, '');   // remove spaces and pipe characters from order ID
    console.log("✅Order ID: " + orderId);

    // extract order ID from orders page and verify
    await page.locator(".fa.fa-handshake-o").click();   // click on orders link
    const ordersTable = await page.locator(".table tbody tr");    // number of rows in orders table
    await ordersTable.first().waitFor({ state: 'visible' });
    const orderCount = await ordersTable.count();         // Await the count() method
    console.log("Number of orders: " + orderCount);     // count number of rows in orders table
    //await page.pause();

    for (let i = 0; i < orderCount; ++i) {
        const requiredId = await ordersTable.nth(i).locator("th").textContent();

        if (requiredId === orderId) {
            console.log("✅Order ID found in orders page: " + requiredId);
            await ordersTable.nth(i).locator(".btn.btn-primary").click();   // click on view details button
            console.log("✅Clicked on view details button.");
            break;
        }
    }
    const orderDetailsPage = await page.locator(".col-text").textContent();
    expect(orderDetailsPage).toBe(orderId);  // assertion to verify that order ID on details page matches
    console.log("✅Order details page verified successfully.");
    });