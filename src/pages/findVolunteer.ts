import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FindVolunteering extends BasePage {
    constructor (page: Page) {
        super(page);
    }

    readonly lnkFindVolunteering: Locator = this.page.getByRole('link', {name: 'Find Volunteering Search a'});
    readonly dropCreator: Locator = this.page.locator('#oopPost');
    readonly CompanyCreator: Locator = this.page.getByRole('link', {name: 'Company'});
    
}