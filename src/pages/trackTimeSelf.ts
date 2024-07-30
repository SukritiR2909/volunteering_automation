import { Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";
import { faker } from '@faker-js/faker';

interface TrackTimeForm {
    trackDescription: string;
}

export class TrackTimeSelf extends BasePage {
    constructor(page: Page){
        super(page);
    }

    readonly lnkTrackTime: Locator = this.page.locator("[href*='volunteering/individual_times/new']");
    readonly txtOrganization: Locator = this.page.getByPlaceholder('Search nonprofit name or EIN');
    readonly radioNonProfit: Locator = this.page.getByText('Nonprofit');
    readonly radioSchool: Locator = this.page.getByText('Schools');
    readonly btnSearch: Locator = this.page.locator('#edit-field a').first();
    readonly btnSelectOrg: Locator = this.page.locator('#organization-331694').getByRole('link', { name: 'Select' });

    readonly txtDate: Locator = this.page.getByPlaceholder('Date');
    readonly txtHours: Locator = this.page.locator('#volunteering_individual_time_hours');

    readonly txtDescription: Locator = this.page.locator('#volunteering_individual_time_description');
    readonly txtAddress: Locator = this.page.getByPlaceholder('Enter an address');
    readonly checkRemoteEvent: Locator = this.page.getByText('This was a remote activity');

    //volunteering opportunity type radios
    readonly radioOpp1: Locator = this.page.getByText('Wildlife conservation: This');
    readonly radioOpp2: Locator = this.page.getByText('Environmental education projects: This is an Environmental education');
    readonly radioOpp3: Locator = this.page.getByText('Recycling: Recycling activity');
    readonly radioOpp4: Locator = this.page.getByText('Green volunteering: Green');
        
    
    readonly dropCauseArea: Locator = this.page.locator('#volunteering_individual_time_volunteering_cause_area_id');

    readonly checkMatching: Locator = this.page.getByText('Submit these hours for a');
    readonly radioKeepPrivate: Locator = this.page.getByText('Keep my information private:');
    readonly radioShareName: Locator = this.page.getByText('Share my name only: Share my');
    readonly radioNameEmail: Locator = this.page.getByText('Share my name and email:')

    readonly checkDesignation: Locator = this.page.getByText('Include a designation for a');

    readonly btnTrackTime: Locator = this.page.getByRole('button', {
        name: 'Track this time'
    });


    async trackTimeSelf(): Promise<TrackTimeForm> {
        const today = new Date();
        const todayDate = today.getDate().toString();

      //random cause area picker
        const options = ['287', '288', '289', '290'];
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex];


        let data: TrackTimeForm = {
            trackDescription: `Auto - ${faker.lorem.paragraph()}`,    
        }


        await this.lnkTrackTime.hover();
        await this.lnkTrackTime.click();
        await this.txtOrganization.click();
        await this.txtOrganization.fill('Rams');
        await this.txtOrganization.press('Enter');
        await this.page.locator('#organization-153656').getByRole('link', {name: 'Select'}).click();
        await this.txtDate.click();
        await this.page.locator(`.ui-state-default >> text="${todayDate}"`).click();
        await this.logger.info('Date entered');
        await this.txtHours.fill('4');
        await this.logger.info('Hours entered');
        await this.txtDescription.fill(data.trackDescription);
        await this.logger.info('Description entered');
        await this.page.getByText('Forhours Icon - add time - 20px Created with Sketch. Add another date Bold').click();
        await this.checkRemoteEvent.click();
        await this.radioOpp2.click();
        await this.dropCauseArea.selectOption(randomOption);
        // await this.checkMatching.click();
        // await this.logger.info('Matching checked');
        // await this.radioKeepPrivate.click();
        

        await this.btnTrackTime.click();
        await this.logger.info('Hours tracked for self');



        return data;
    }
}
