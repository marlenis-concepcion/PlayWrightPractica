import { type Locator, type Page, expect } from "playwright/test";
import envs from "../utils/envs";

export class LoginPage {
  readonly page: Page;
  readonly pageTitle: RegExp;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = /Swage Lab/;
  }

  async loadUrlSaucedemo(url: any) {
    //await this.page.context().storageState({ path: "" });
    await this.page.goto(url);
  }

  async setUsername(username: any) {
    await this.page.getByPlaceholder("Username").pressSequentially(username);
  }

  async setPassword(password: any) {
    await this.page.getByPlaceholder("Password").pressSequentially(password);
  }

  async clickLoginBtn() {
    await this.page.getByText("Login", { exact: true }).click();
  }
}
