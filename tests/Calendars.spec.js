const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test('Calendar Validations', async ({page}) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();   // click on date picker input field to open calendar
    await page.locator(".react-calendar__navigation__label__labelText").click();  // click on month-year label to switch to month selection view
    await page.locator(".react-calendar__navigation__label__labelText").click();  // click again on month-year label to switch to year selection view
    await page.getByText(year).click();   // select the desired year
    await page.locator(".react-calendar__year-view__months__month").nth(parseInt(monthNumber) - 1).click();  // select the desired month
    await page.locator("//abbr[text()='"+date+"']").click();  // select the desired date
    const inputs = page.locator(".react-date-picker__inputGroup__input");

    for (let i = 0; i<expectedList.length; ++i){
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
        console.log(`Assertion passed for ${i} iteration`);
    }

})


// this is the change to be tested
// 2nd change to be tested
