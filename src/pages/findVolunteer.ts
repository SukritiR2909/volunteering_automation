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

    //---------->to make copy of the event<---------//

    readonly txtOrganization: Locator = this.page.getByPlaceholder('Search nonprofit name');
    readonly btnSearchOrganization: Locator = this.page.getByRole('link', {
        name: 'Search'
    });
    readonly txtCoHost: Locator = this.page.getByPlaceholder('Search user name or email');
    readonly CohostUser: Locator = this.page.getByRole('option', { name: 'Esplin Jenkerson 1072524@' })
    readonly btnSaveAndPreview: Locator = this.page.getByRole('button', {
        name: 'Save & Preview'
     })

    readonly btnSaveAndPublish: Locator = this.page.getByRole('link', {
        name: 'Publish Event'
    })

    readonly btnPublish: Locator = this.page.getByRole('button', {
        name: 'Publish'
    })
    readonly btnViewEvent: Locator = this.page.getByRole('link', {
        name: 'View Event'
    })

    async makeCopyEvnet(): Promise<void>{
        await this.dropCreator.click();
        await this.CompanyCreator.click();
        await this.logger.info('Created by company filter');
        await this.eventCard.click();
        await this.logger.info('Clicked on event');
        await this.btnCopyEvent.click();
        await this.txtOrganization.fill('fams');
        await this.btnSearchOrganization.click();
        await this.page.getByRole('link', { name: 'Fresno Art Museum 941358318 US' }).click();
        await this.logger.info('Organization added');
        await this.txtCoHost.fill('Esplin');
        await this.CohostUser.click();
        await this.logger.info('Co-host assigned');
        await this.btnSaveAndPreview.click();
        await this.btnSaveAndPublish.click();
        await this.btnPublish.click();
        await this.btnViewEvent.click();
    }

}