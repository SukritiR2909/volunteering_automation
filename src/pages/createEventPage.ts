import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { promises } from 'dns';
import { faker } from '@faker-js/faker';

interface CreateEventForm {
    eventTitle: string;
    eventCoverDescription: string;
    eventOrganization: string;
    eventDescription: string;
    eventCoHost: string;
    shiftName: string;
    shiftStartDate: string;
    shiftEndDate: string;
    shiftDescription: string;
    shiftParticipantAllowed: string;
}

export class CreateEventPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    

    readonly contentEvent: Locator = this.page.locator('#edit-fields');
    readonly txtEventTitle: Locator = this.page.getByPlaceholder('Title...')
    readonly btnUploadCover: Locator = this.page.locator('#volunteering_scheduled_event_cover');
    readonly txtCoverDescription: Locator = this.page.getByPlaceholder('Cover description');
    readonly btnUploadWaiver: Locator = this.page.locator('#volunteering_scheduled_event_waiver');
    readonly txtOrganization: Locator = this.page.getByPlaceholder('Search nonprofit name');
    readonly btnSearchOrganization: Locator = this.page.getByRole('link', {
        name: 'Search'
    });

    readonly txtEventDescription: Locator = this.page.locator('#volunteering_scheduled_event_description');
    readonly txtCoHost: Locator = this.page.getByPlaceholder('Search user name or email');
    readonly CohostUser: Locator = this.page.getByRole('option', { name: 'Esplin Jenkerson 1072524@' })
    readonly txtAddress: Locator = this.page.getByPlaceholder('Enter an address');
    readonly btnRemoteEventCheck: Locator = this.page.getByText('This event can be attended');
    readonly dropTimeZone: Locator = this.page.locator('#volunteering_scheduled_event_time_zone');

    //volunteering opportunity type radios
    readonly radioOpp1: Locator = this.page.getByText('Running activity: Running');
    readonly radioOpp2: Locator = this.page.getByText('Cooking activity: cooking');
    readonly radioOpp3: Locator = this.page.getByText('Giving activity: Givign');
    // readonly radioOpp4: Locator = this.page.getByText('Green volunteering: Green');


    readonly dropCauseArea: Locator = this.page.locator('#volunteering_scheduled_event_volunteering_cause_area_id');

    //privacy and designation
    readonly radioKeepPrivate: Locator = this.page.getByText('Keep my information private:');
    readonly radioNameOnly: Locator = this.page.getByText('Share my name only: Share my');
    readonly radioNameEmail: Locator = this.page.getByText('Share my name and email:');
    
    readonly checkDesignation: Locator = this.page.getByText('Include a designation for a');
    readonly txtDesignation: Locator = this.page.getByPlaceholder('Designations are shared with');

    // event shifts, dates and time
    readonly radioShiftYes: Locator = this.page.getByLabel('Yes');
    readonly radioShiftNo: Locator = this.page.getByLabel('No', { exact: true });

    // while shifts are present
    readonly lnkFirstShift: Locator = this.page.getByText('Shift 1'); //make it dynamic
    readonly lnkAddShift: Locator = this.page.getByRole('link', {
        name: '+ New Shift'
    });


    //shift form
    readonly txtShiftName: Locator = this.page.getByPlaceholder('Shift name');
    readonly txtStartDate: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_start_date');
    readonly txtEndDate: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_end_date');
    readonly dropStartTime: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_start_time');
    readonly dropEndTime: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_end_time');
    readonly txtShiftDescription: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_description');
    readonly dropSkills: Locator = this.page.getByPlaceholder('Choose Useful Skills...');
    readonly dropEventGreatFor: Locator = this.page.getByPlaceholder('Choose Great for Details...');
    readonly txtHoursPerAttendee: Locator = this.page.locator('#volunteering_scheduled_event_shifts_attributes_0_hour_estimation');
    readonly txtLimitOfParticipant: Locator = this.page.getByLabel('Participant allowed for this');
    readonly checkNoParticipantLimit: Locator = this.page.getByText('There is no participant limit');

    //who can sign up
    readonly dropWhoCanSignup: Locator = this.page.getByLabel('privacy');

    // final check boxes
    readonly checkSponsoredByWizehive: Locator = this.page.getByText('Mark this event as sponsored');
    readonly checkMatching: Locator = this.page.getByText('Make this event as eligible');
    readonly checkTshirtSize: Locator = this.page.getByText('Mark this to request');

    //save and cancel button
    readonly btnCancel: Locator = this.page.getByRole('link', {name: 'Cancel'});
    readonly btnSaveAndPreview: Locator = this.page.getByRole('button', {
        name: 'Save & Preview' })


        async enterEventFakerData(): Promise<CreateEventForm> {

            //date 

            const today = new Date();
            const todayDate = today.getDate().toString();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const tomorrowDay = tomorrow.getDate().toString();

            //random cause area picker
            const options = ['286', '287', '288', '289'];
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomOption = options[randomIndex];


            //form data
            
            let data: CreateEventForm = {
                eventTitle: `Auto - ${faker.word.words(2)}`,
                eventCoverDescription: faker.lorem.paragraph(),
                eventOrganization: faker.company.name(),
                eventDescription: faker.lorem.paragraphs(),
                shiftName: faker.word.words(2),
                shiftStartDate: todayDate,
                shiftEndDate: tomorrowDay,
                shiftDescription: faker.lorem.paragraph(),
                shiftParticipantAllowed: faker.number.int(50).toString(),
                eventCoHost: '',
            };
        
            await this.txtEventTitle.fill(data.eventTitle);
            await this.logger.info('Title was filled');
            await this.btnUploadCover.setInputFiles('assets/file2.jpeg')
            await this.txtCoverDescription.fill(data.eventCoverDescription);
            await this.logger.info('Cover uploaded and description added');
            await this.txtOrganization.fill(data.eventOrganization);
            await this.logger.info('Organization added');
            await this.txtEventDescription.fill(data.eventDescription);
            await this.logger.info('Event description added');
            await this.txtCoHost.fill('Esplin');
            await this.CohostUser.click();
            await this.logger.info('Co-host assigned');
            await this.btnRemoteEventCheck.click();
            await this.logger.info('Address mentioned');
            await this.radioOpp2.click();
            await this.dropCauseArea.selectOption(randomOption);
            await this.radioShiftYes.click();
            await this.txtShiftName.fill(data.shiftName);
            await this.txtStartDate.click();
            await this.page.locator(`.ui-state-default >> text="${todayDate}"`).click();
            await this.logger.info('Start date was clicked');
            await this.txtEndDate.click();
            await this.page.locator(`.ui-state-default >> text="${tomorrowDay}"`).click();
            await this.logger.info('End date was clicked');
            await this.dropStartTime.click();
            await this.dropStartTime.fill('12:00am');
            await this.dropEndTime.click();
            await this.dropEndTime.fill('11:30pm');
            await this.dropEndTime.press('Enter');
            await this.contentEvent.click();
            await this.txtShiftDescription.fill(data.shiftDescription);
            await this.contentEvent.click();
            await this.txtHoursPerAttendee.fill('4');
            await this.contentEvent.click();

           
        
            return data;
          }

    async createEvent(): Promise<CreateEventForm> {
            await this.logger.info(`====> Creating A New Event <=====`);
            let fakerData = await this.enterEventFakerData();
            await this.btnSaveAndPreview.click();
            await this.logger.info(`Clicked on button - Save & Preview`);
            return fakerData;
          }

     async editEvent(eventTitle: string): Promise<CreateEventForm> {
            await this.logger.info(`==========> Editing an Event <==========`);
            await this.page.getByRole('link', { name: eventTitle }).click();
            let fakerData = await this.enterEventFakerData();
            await this.btnSaveAndPreview.click();
            await this.logger.info(`Clicked on button - Save & Preview`);
            return fakerData;
          }
        
}