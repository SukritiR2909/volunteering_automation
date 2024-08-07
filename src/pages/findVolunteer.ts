import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FindVolunteering extends BasePage {
    constructor (page: Page) {
        super(page);
    }

    readonly lnkFindVolunteering: Locator = this.page.getByRole('link', {name: 'Find Volunteering Search a'});
    readonly dropCreator: Locator = this.page.locator('#oopPost');
    readonly CompanyCreator: Locator = this.page.getByRole('link', {name: 'Company'});
    readonly eventCard: Locator = this.page.locator('role=link', { hasText: /^Auto -/ }).first();
    readonly btnSignUp: Locator = this.page.getByRole('link', {name: 'Sign up'});
    readonly btnConfirmSignUp: Locator = this.page.getByRole('button', {name: 'Confirm and sign up!'});
    readonly btnLeaveEvent: Locator = this.page.getByRole('link', {name: 'Leave Shift'});
    readonly btnShareEvent: Locator = this.page.getByRole('link', {name: 'Share Event'});
    readonly btnCopyEvent: Locator = this.page.getByRole('link', {name: 'Copy Event'});

    readonly btnCopyLink: Locator = this.page.locator('.copy-text').first();
    readonly btnCloseShare: Locator = this.page.getByRole('link', {name: 'Close'});

    async noShiftSignUp(): Promise<void> {
        // await this.lnkFindVolunteering.click();
        await this.dropCreator.click();
        await this.CompanyCreator.click();
        await this.logger.info('Created by company filter');
        await this.eventCard.click();
        await this.logger.info('Clicked on event');
        await this.btnSignUp.click();
        await this.logger.info('Clicked on sign up');
        await this.btnConfirmSignUp.click();
        await this.logger.info('Confirmed Signup');
    }
    
    async shareEvent(): Promise<void> {
        await this.dropCreator.click();
        await this.CompanyCreator.click();
        await this.logger.info('Created by company filter');
        await this.eventCard.click();
        await this.logger.info('Clicked on event');
        await this.btnShareEvent.click();
        await this.btnCopyLink.click();
        await this.logger.info('Link to share event copied')
    }

    async makeCopyEvnet(): Promise<void>{
        await this.dropCreator.click();
        await this.CompanyCreator.click();
        await this.logger.info('Created by company filter');
        await this.eventCard.click();
        await this.logger.info('Clicked on event');
        await this.btnCopyEvent.click();
        
    }

}