// request Exposes API that can be used for the Web API testing.
const {test, expect, request} = require("@playwright/test");
const { only } = require("node:test");

const loginPayload = {userEmail: "dummyemailJunaid@hotmail.com", userPassword: "P@ssw0rd1!"};
let token;

// Declares a beforeAll hook that is executed once per worker process before all tests.
test.beforeAll(async() => {
    // Creates a new API context (like opening Post
    const apiContext = await request.newContext();

    // Make POST request to login API
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                        {
                            data:loginPayload
                        })
    
    // Contains a boolean stating whether the response was successful (status in the range 200-299) or not.
    expect(loginResponse.ok()).toBeTruthy();

    // Returns the JSON representation of response body.
    const loginResponseJson = await loginResponse.json();

    // extract token value from login Response JSON
    token = loginResponseJson.token;
    console.log(token);
})

test('Place the Order', async ({page}) => {
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    
    const products = page.locator(".card-body");   
    const productName = "ADIDAS ORIGINAL";
    const cardTitles = page.locator(".card-body b");                          
    const cartBtn = page.getByRole('button', {name: 'Cart 1'});
   
    await page.waitForLoadState('networkidle');                           // wait for network to be idle (all requests finished)
    //const titles = await cardTitles.allTextContents();                    // get text contents of all matching elements
    await products.first().waitFor({ state: 'visible' });   // wait for the first product card to be visible
    //console.log(titles);
    //const selectedCard = titles[1];   // select the second card title
    // select a card based on productName (selecting product dynamically)

    const count = await products.count();
    console.log("✅Total products found: ${count}");
    for (let i = 0; i<count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            console.log('Selected Card Title: ' + productName);
            await products.nth(i).locator('button:has-text("Add To Cart")').click();
            console.log("✅Item selected and added to cart: " + productName);
            break;
        }
    }

    await cartBtn.click();
    console.log("✅cart button clicked");

    // assertion to verify that the selected item is in the cart
    const cartItem = page.locator('h3:has-text("' + productName + '")');
    const text = await cartItem.textContent();
    console.log("Cart Item: " + text);

    try {
         await expect(cartItem).toHaveText(productName);
         console.log("✅Assertion passed: Item is in the cart.");
    }
    catch (error) {
        console.error("❌Assertion failed: Item is not in the cart.");
    }

    // go to checkout page
    const checkoutBtn = page.locator('button:has-text("Checkout")');   // text based locators
    const buyNowBtn = page.locator('button:has-text("Buy Now")');

    if (await checkoutBtn.isVisible()) {
        await checkoutBtn.click();
        console.log("Checkout button clicked.");
    }
    else if (await buyNowBtn.isVisible()) {
        await buyNowBtn.click();
        console.log("Buy Now button clicked.");
    }
    console.log("✅landed on checkout page.");

    // fill checkout page credentials
    const creditCardNumber = page.locator("input[value='4542 9931 9292 2293']");
    const monthDropdown = page.locator('.input.ddl').first();
    const yearDropdown = page.locator('.input.ddl').nth(1);
    const cvvField = page.locator('.field.small', {hasText: 'CVV Code'}).locator('input');    // finding by parent container 
    const cardName = page.locator('.field', { hasText: 'Name on Card' }).locator('input');    // finding by parent container
    const countryInput = page.locator('[placeholder="Select Country"]');
    const couponCode = page.locator('[name="coupon"]');
    const couponApplyBtn = page.locator('button:has-text("Apply Coupon")');
    const placeOrderBtn = page.locator('a:has-text("PLACE ORDER")');

    await creditCardNumber.fill('1234123412341234');
    await monthDropdown.selectOption('02');   // select February
    await yearDropdown.selectOption('28');    // select 2028
    await cvvField.fill('123');
    await cardName.fill('Johndoe');
    
    // Handle dynamic dropdown for country selection (auto suggestion dropdown)
    await countryInput.click();                                     //await countryInput.fill('India');
    await countryInput.pressSequentially('Ind', { delay: 100 });    // simulate typing with delay
    //await page.waitForSelector('button.ta-item');                   // ← Wait for dropdown!
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
    //await expect(page.locator(".user__name [type='text']").first()).toHaveText(userloginEmail);

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