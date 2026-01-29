const {test, expect} = require("@playwright/test");
const { only } = require("node:test");

// syntax for a test case
test('Browser Context Playwright Test', async ({browser}) => {
    // test steps will go here
    const context = await browser.newContext();                    // this method creates a new browser context (fresh browser session)
    const page = await context.newPage();                               // this method creates a new page in the browser context
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");      // navigate to the URL
    console.log("Page title is: " + await page.title());
    // css, xpath selectors (helps to locate elements on the page)
    await userName.fill('rahulshetty');          // fill method is used to enter text into input fields
    await page.locator("[type='password']").fill('learning');          // locate password field using attribute selector and fill it
    await signIn.click();                          // click method is used to click on buttons/links
    // auto wait capability of Playwright (waits for elements to be ready before performing actions)
    console.log(await page.locator("[style*='block']").textContent());               // get the text content of an element (used for verification)]")
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');   // assertion to verify that the element contains specific text
    await userName.fill("");                       // clear the username field
    await userName.fill("rahulshettyacademy");   // fill username field with correct username
    // Debug: Check if button exists and is visible
    console.log("Button visible:", await signIn.isVisible());
    console.log("Button enabled:", await signIn.isEnabled());
    await signIn.click();                          // click on sign-in button
    console.log(await cardTitles.nth(0).textContent());               // get the text content of an element (used for verification)
    const allTitles = await cardTitles.allTextContents();                    // get text contents of all matching elements
    console.log(allTitles);

    });

test('Page Playwright Test', async ({page}) => {        //.only method is used to run only this specific test case 
    // test steps will go here                           
    await page.goto("https://google.com");      // navigate to the URL
    // get title of the page
    const title = await page.title();
    console.log("Page title is: " + title);
    // assertion to verify the title toHaveTitle (assert that title contains 'Google')
    await expect(page).toHaveTitle(/Google/);
    });

test('UI Test', async ({page}) => {        
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const pswd = page.locator('#password');
    const dropdown = page.locator('select.form-control');   // static dropdown are used for selecting predefined options
    const signIn = page.locator("#signInBtn");
    const radioBtn = page.locator('.radiotextsty').last();   // radio buttons are used for selecting one option from a set
    const popupOkBtn = page.locator('#okayBtn');      // locate popup OK button
    const checkBox = page.locator('#terms');
    const documentLink = page.locator('[href*="documents-request"]');  // locate link using partial href match
    await dropdown.selectOption('consult');          // select option from dropdown by value
    await radioBtn.click();                           // click on the radio button
    await popupOkBtn.click();                         // click on the popup OK button
    console.log(await radioBtn.isChecked());        // check if the radio button is selected
    await expect(radioBtn).toBeChecked();               // assertion to verify that the radio button is checked
    await checkBox.click();                             // click on the checkbox
    await expect(checkBox).toBeChecked();                 // assertion to verify that the checkbox is checked
    await checkBox.uncheck();                           // uncheck the checkbox
    await expect(checkBox).not.toBeChecked();           // .not allows us to assert the opposite condition
    await expect(documentLink).toHaveAttribute('class', 'blinkingText'); // assertion to verify that the link has a specific class attribute


    //await page.pause();                                 // pause the test execution (for debugging purposes)
    });

test('Child Windows Handling Test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator('[href*="documents-request"]');  // locate link using partial href match
    
    const [newPage] = await Promise.all([     // Promise.all is used to handle multiple asynchronous operations
        context.waitForEvent('page'),  // wait for the new page (child window) to open (listener for 'page' event)
        documentLink.click(),           // click on the link that opens the new window
        //await is not used for context.waitForEvent('page') because we want both actions to happen simultaneously
    ]);
    const newPageTitle = await newPage.title();   // get the title of the new page
    const text = await newPage.locator('.red').textContent();   // get the text content of an element with class 'red' on the new page
    console.log(text);
    const arrayText = text.split('@');   // split the text at '@' character. return array
    const domain = arrayText[1].split(' ')[0];   // further split the second part at space to isolate the email
    console.log('Extracted domain: ' + domain);
    await userName.fill(domain);   // fill the username field on the original page with the extracted domain
    //console.log(await userName.textContent());  // will not work as textContent() is not applicable for input fields (not attached to DOM element text)
    console.log(await userName.inputValue());      // inputValue() method retrieves the current value of the input field  
    //await page.pause();
})

test.only('End to end project', async ({page}) => {        
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const registerBtn = page.locator('.btn1');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const userEmail = page.locator('#userEmail');
    const phoneNumber = page.locator('#userMobile');
    const occupation = page.locator('select[formcontrolname="occupation"]');
    const genderRadios = page.locator('input[type="radio"][formcontrolname="gender"]');  // get all radiobuttons as a NodeList
    const maleRadio = genderRadios.nth(0);   // First one (Male)
    const femaleRadio = genderRadios.nth(1); // Second one (Female)
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const checkBox = page.locator('input[type="checkbox"]');
    const signUpBtn = page.locator('#login');
    const loginBtn = page.locator('.btn.btn-primary');
    const emailField = page.locator('#userEmail');
    const pswdField = page.locator('#userPassword');
    const mainloginBtn = page.locator('#login');
    const userfirstName = 'Junaid';
    const userlastName = 'Tanveer';
    const userloginEmail = 'dummyemailJunaid@hotmail.com';
    const phoneNumberValue = '1234567890';
    const passwordValue = 'P@ssw0rd1!';
    const occupationValue = 'Student';
    const products = page.locator(".card-body");   
    const productName = "ADIDAS ORIGINAL";
    const cardTitles = page.locator(".card-body b");                          
    const cartBtn = page.getByRole('button', {name: 'Cart 1'});
    // await registerBtn.click();
    // await firstName.fill(userfirstName);
    // await lastName.fill(userlastName);
    // await userEmail.fill(userloginEmail);
    // await phoneNumber.fill(phoneNumberValue);
    // await occupation.selectOption(occupationValue);
    // await maleRadio.click();
    // await password.fill(passwordValue);
    // await confirmPassword.fill(passwordValue);
    // await checkBox.click();
    // await signUpBtn.click();
    // await loginBtn.click();
    await emailField.fill(userloginEmail);
    await pswdField.fill(passwordValue);
    await mainloginBtn.click();
    console.log("End to end login test completed successfully.");
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



    //console.log('Selected Card Title: ' + selectedCard);
    //chaining locators concept is when we use multiple locators to narrow down to a specific element
    //await page.locator('.card-body').filter({hasText: selectedCard}).locator('button:has-text("Add To Cart")').first().click();  // filter card titles to find the one matching selectedCard and click its 'Add To Cart' button. 
    
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
    await cardName.fill(userfirstName);
    
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
    });
