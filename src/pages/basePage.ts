import { Page } from "playwright/test";
import { LoggerFile } from "../../logger/logger";

export class BasePage {
  protected logger: any;
  constructor(public page: Page) {
    this.page = page;
    this.logger = LoggerFile.getInstance();
  }
}