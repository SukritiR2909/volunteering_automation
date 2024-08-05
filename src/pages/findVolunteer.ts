import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FindVolunteering extends BasePage {
    constructor (page: Page) {
        super(page);
    }

    readonly lnkFindVolunteering: Locator = this.page.getByRole('link', {name: 'Find Volunteering Search a'});
    
}