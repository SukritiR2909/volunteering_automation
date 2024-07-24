import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class  AccountSettings extends BasePage {
    constructor(page: Page) {
        super(page);
      }

    
}