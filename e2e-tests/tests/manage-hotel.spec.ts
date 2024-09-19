 import {test,expect} from '@playwright/test';
 import path from 'path';

 const UI_URL = " http://localhost:5173/";
 
 test.beforeEach(async({page})=>{
    await page.goto(UI_URL);

    //get sign-in btn
   
    await page.getByRole("link",{name:"Sign-in"}).click();
   
    await expect(page.getByRole("heading",{name:"Sign-in"})).toBeVisible() ;
   
    await  page.locator("[name=email]").fill("1@1.com");
    await  page.locator("[name=password]").fill("password123");
   
    await page.getByRole("button",{name:"Login"}).click();
   
    await expect(page.getByText("Sign In Successfull!")).toBeVisible();  
 });

 test("should allow user to add a hotel",async({page})=>{
    await page.goto(`${UI_URL}add-hotel`);
//  add hotel that is main were name and cty etc are there
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test city");
    await page.locator('[name="country"]').fill("Test country");
    await page.locator('[name="description"]').fill("This is a description for the test hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3");
    //  type
     await page.getByText("Budget").click();

    //  /facilities
     await page.getByLabel("Free Wifi").check();
     await page.getByLabel("Parking").check();

    //  guest section
      await page.locator('[name="adultCount"]').fill("2");
      await page.locator('[name="childCount"]').fill("1");

      //imagery section
      await page.setInputFiles('[name="imageFiles"]',[
         path.join(__dirname,"files","1pic.png"),
         path.join(__dirname,"files","2pic.png"),
 
      ]);
       await page.getByRole('button',{name:"Save"}).click(); 
       await page.waitForTimeout(2000);
       await expect(page.getByText("HotelSaved")).toBeVisible( );
      
 });

 test("should display hotels",async({page})=>{
   await page.goto(`${UI_URL}my-hotels`);
   await expect(page.getByText("Dublin Getaways")).toBeVisible();
   await expect(page.getByText("Lorem ipsum dolor sit amet,")).toBeVisible();
   await expect(page.getByText("Dublin,Ireland")).toBeVisible();
   await expect(page.getByText("All Inclusive")).toBeVisible();
   await expect(page.getByText("$119 pre Night")).toBeVisible();
   await expect(page.getByText("2 adult's ,3 children's")).toBeVisible();
   await expect(page.getByText("2 star")).toBeVisible();

   await expect( page.getByRole("link",{name: "View Details"})).toBeVisible();
   await expect( page.getByRole("link",{name: "Add Hotel"})).toBeVisible();


 });
 test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
  await page.locator('[name="name"]').fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  await page.locator('[name="name"]').fill("Dublin Getaways");
  await page.getByRole("button", { name: "Save" }).click();
});