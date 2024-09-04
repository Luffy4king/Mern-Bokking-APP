import { test, expect } from '@playwright/test';

const UI_URL = " http://localhost:5173/";


test('should allow to user to Sign-in', async ({ page }) => {
 await page.goto(UI_URL);

 //get signin btn

 await page.getByRole("link",{name:"Sign-in"}).click();

 await expect(page.getByRole("heading",{name:"Sign-in"})).toBeVisible() ;

 await  page.locator("[name=email]").fill("1@1.com");
 await  page.locator("[name=password]").fill("password123");

 await page.getByRole("button",{name:"Login"}).click();

 await expect(page.getByText("Sign In Successfull!")).toBeVisible();

 await expect(page.getByRole("link",{name:"My Booking"})).toBeVisible();
 await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
 await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible();



});



//registration

test("should allow  user to register",async ({page}) => {

    const testEmail = `test_${Math.floor(Math.random()*90000)+10000}@example.com`;
    await page.goto(UI_URL);

    await page.getByRole("link",{name:"Sign-In"}).click();
     await page.getByRole("link",{name:"Create an Account"}).click();

     await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible();

     await page.locator("[name=firstName]").fill("John");
     await page.locator("[name=lastName]").fill("Doe");
     await page.locator("[name=email]").fill(testEmail);
     await page.locator("[name=password]").fill("password123");
     await page.locator("[name=confirmPassword]").fill("password123");

     await page.getByRole("button",{name:"Create Account"}).click();
     
 await expect(page.getByText("Registration Success")).toBeVisible();

 await expect(page.getByRole("link",{name:"My Booking"})).toBeVisible();
 await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
 await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible();


})
