import { test, expect } from "playwright/test";
import { LoginPage } from "../pages/loginPOM";
import { chromium } from "playwright";

const URL = "https://www.saucedemo.com/";

const Username = "standard_user";
const Password = "secret_sauce";
const wrongPassword = "secret_sauce111";

let loginPOM: LoginPage;

test.describe("Verify Login scenarios", () => {

  test.beforeEach(async ({ page }) => {
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // await context.clearCookies();
    loginPOM = new LoginPage(page);
  });

  test.afterEach(async ({ page }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    await context.close();
    // await page.pause();
  });

  test("Login happy path", async ({ page }) => {
    await loginPOM.loadUrlSaucedemo(URL);
    await loginPOM.setUsername(Username);
    await loginPOM.setPassword(Password);
    await loginPOM.clickLoginBtn();
    await expect(
      page.getByText("Products").or(page.getByText("Name (A to Z)")).first()
    ).toBeVisible();
  });

  test("Login - wrong password", async ({ page }) => {
    await loginPOM.loadUrlSaucedemo(URL);
    await loginPOM.setUsername(Username);
    await loginPOM.setPassword(wrongPassword);
    await loginPOM.clickLoginBtn();
    await expect(
      page.locator("//h3[contains(@data-test,'error')]")
    ).toContainText([
      "Epic sadface: Username and password do not match any user in this service",
    ]);
  });
//h3[contains(@data-test,'error')]

});
