import { Locator, Page} from '@playwright/test';
import { BasePage } from './basePage';


export class VolunteerMenuPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly lnkEvent: Locator = this.page.getByRole('link', { 
        name: 'Create an Event Organize and' 
    });
    
    readonly lnkTrackTime: Locator = this.page.getByRole('link', {
        name: 'Track time Log and submit'
    });

    readonly lnkFindVolunteer: Locator = this.page.getByRole('link', {
        name: 'Find Volunteering Search a'
    });

    async clickEvent(): Promise<void> {
        await this.lnkEvent.click();
        await this.logger.info('Create event was clicked.');
    }

    async clickTrackTime(): Promise<void> {
        await this.lnkTrackTime.click();
        await this.logger.info('Track time was clicked.')
    }

    async clickFindVolunteer(): Promise<void> {
        await this.lnkFindVolunteer.click();
        await this.logger.info('Find volunteering was clicked')
    }

}