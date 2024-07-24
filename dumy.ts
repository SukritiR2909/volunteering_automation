import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import path from 'path';
import { faker } from '@faker-js/faker';

interface CreateEventForm {
  eventTitle: string;
  eventCoverDescription: string;
  eventOrganization: string;
  eventDescription: string;
  eventCoHost: string;
  eventAddress: string;
  shiftName: string;
  shiftStartDate: string;
  shiftEndDate: string;
  shiftDescription: string;
  shiftHoursPerAttendee: string;
  shiftParticipantAllowed: string;
}

export class CreateEventPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly txtEventTitle: Locator = this.page.getByPlaceholder('Title...');
  readonly btnUploadCover: Locator = this.page.locator('#volunteering_scheduled_event_cover');
  readonly txtCoverDescription: Locator = this.page.getByPlaceholder('Cover description');
  readonly txtOrganization: Locator = this.page.getByPlaceholder('Search nonprofit name');
  readonly btnSearchOrganization: Locator = this.page.getByRole('link', { name: 'Search' });
  readonly txtEventDescription: Locator = this.page.locator('#volunteering_scheduled_event_description');
  readonly txtCoHost: Locator = this.page.getByPlaceholder('Search user name or email');
  readonly txtAddress: Locator = this.page.getByPlaceholder('Enter an address');
  readonly btnRemoteEventCheck: Locator = this.page.getByText('This event can be attended');
  readonly dropTimeZone: Locator = this.page.locator('#volunteering_scheduled_event_time_zone');
  readonly radioInOffice: Locator = this.page.getByText('In Office: To be attended');
  readonly radioRemote: Locator = this.page.getByText('In Remote: Can be attended from');
  readonly radioHybrid: Locator = this.page.getByText('Hybrid: Can be attended from');
  readonly dropCauseArea: Locator = this.page.locator('#volunteering_scheduled_event_volunteering_cause_area_id');
  readonly radioKeepPrivate: Locator = this.page.getByText('Keep my information private:');
  readonly radioNameOnly: Locator = this.page.getByText('Share my name only: Share my');
  readonly radioNameEmail: Locator = this.page.getByText('Share my name and email:');
  readonly checkDesignation: Locator = this.page.getByText('Include a designation for a');
  readonly txtDesignation: Locator = this.page.getByPlaceholder('Designations are shared with');
  readonly radioShiftYes: Locator = this.page.getByLabel('Yes');
  readonly radioShiftNo: Locator = this.page.getByLabel('No', { exact: true });
  readonly lnkFirstShift: Locator = this.page.getByText('Shift 1'); // Make it dynamic
  readonly lnkAddShift: Locator = this.page.getByRole('link', { name: '+ New Shift' });
  readonly txtShiftName: Locator = this.page.getByPlaceholder('Shift name');
  readonly txtStartDate: Locator = this.page.locator('#volunteering_scheduled_event_attributes_0_start_date');
  readonly txtEndDate: Locator = this.page.locator('#volunteering_scheduled_event_attributes_0_end_date');
  readonly dropStartTime: Locator = this.page.locator('#volunteering_scheduled_event_shift_attributes_0_start_time');
  readonly dropEndTime: Locator = this.page.locator('#volunteering_scheduled_event_shift_attributes_0_end_time');
  readonly txtShiftDescription: Locator = this.page.locator('#volunteering_scheduled_event_shift_attributes_0_description');
  readonly dropSkills: Locator = this.page.getByPlaceholder('Choose Useful Skills...');
  readonly dropEventGreatFor: Locator = this.page.getByPlaceholder('Choose Great for Details...');
  readonly txtHoursPerAttendee: Locator = this.page.locator('#volunteering_scheduled_event_shift_attributes_0_hour_estimation');
  readonly txtLimitOfParticipant: Locator = this.page.getByLabel('Participant allowed for this');
  readonly checkNoParticipantLimit: Locator = this.page.getByText('There is no participant limit');
  readonly dropWhoCanSignup: Locator = this.page.getByLabel('privacy');
  readonly checkSponsoredByWizehive: Locator = this.page.getByText('Mark this event as sponsored');
  readonly checkMatching: Locator = this.page.getByText('Make this event as eligible');
  readonly checkTshirtSize: Locator = this.page.getByText('Mark this to request');
  readonly btnCancel: Locator = this.page.getByRole('link', { name: 'Cancel' });
  readonly btnSaveAndPreview: Locator = this.page.getByRole('button', { name: 'Save & Preview' });

  async enterEventTitle(title: string): Promise<void> {
    await this.txtEventTitle.clear();
    await this.txtEventTitle.fill(title);
    await this.logger.info(`Entered text - Event Title: ${title}`);
  }

  async uploadCover(): Promise<void> {
    const filePath = path.join(__dirname, "..", "testData", "demo.jpg");
    await this.btnUploadCover.setInputFiles(filePath);
    await this.txtCoverDescription.clear();
    await this.txtCoverDescription.fill(faker.lorem.sentence());
  }

  async enterEventFakerData(): Promise<CreateEventForm> {
    const filePath = path.join(__dirname, "..", "testData", "demo.jpg");
    let data: CreateEventForm = {
      eventTitle: `Auto - ${faker.word.words(2)}`,
      eventCoverDescription: faker.lorem.paragraph(),
      eventOrganization: faker.company.name(),
      eventDescription: faker.lorem.paragraphs(),
      eventCoHost: faker.name.firstName(),
      eventAddress: faker.address.streetAddress(),
      shiftName: faker.word.words(2),
      shiftStartDate: faker.date.future().toISOString().split('T')[0],
      shiftEndDate: faker.date.future().toISOString().split('T')[0],
      shiftDescription: faker.lorem.paragraph(),
      shiftHoursPerAttendee: faker.number.int(8).toString(),
      shiftParticipantAllowed: faker.number.int(50).toString()
    };

    await this.enterEventTitle(data.eventTitle);
    await this.uploadCover();
    await this.txtCoverDescription.fill(data.eventCoverDescription);
    await this.txtOrganization.fill(data.eventOrganization);
    await this.txtEventDescription.fill(data.eventDescription);
    await this.txtCoHost.fill(data.eventCoHost);
    await this.txtAddress.fill(data.eventAddress);
    await this.txtShiftName.fill(data.shiftName);
    await this.txtStartDate.fill(data.shiftStartDate);
    await this.txtEndDate.fill(data.shiftEndDate);
    await this.txtShiftDescription.fill(data.shiftDescription);
    await this.txtHoursPerAttendee.fill(data.shiftHoursPerAttendee);
    await this.txtLimitOfParticipant.fill(data.shiftParticipantAllowed);

    return data;
  }

  async createEvent(): Promise<CreateEventForm> {
    await this.logger.info(`==========> Creating A New Event <==========`);
    let fakerData = await this.enterEventFakerData();
    await this.btnSaveAndPreview.click();
    return fakerData;
  }

  async editEvent(eventName: string): Promise<CreateEventForm> {
    await this.logger.info(`==========> Editing an Event <==========`);
    await this.page.locator(`text=${eventName}`).click();
    let fakerData = await this.enterEventFakerData();
    await this.btnSaveAndPreview.click();
    return fakerData;
  }

  async previewEvent(eventName: string): Promise<void> {
    await this.page.locator(`text=${eventName}`).click();
    await this.page.waitForLoadState("networkidle");
    await this.logger.info(`Clicked on icon - Preview Event: ${eventName}`);
  }
  
  async isTableHeaderDisplayed(headerName: string): Promise<boolean> {
    return await this.page.locator(`text=${headerName}`).isVisible();
  }

  async enterEventTitleFilter(eventTitle: string): Promise<void> {
    await this.txtEventTitle.clear();
    await this.txtEventTitle.fill(eventTitle);
  }

  async clickClearFilter(): Promise<void> {
    await this.page.getByRole('button', { name: 'Clear Filter' }).click();
  }

  async getFirstEventTitle(): Promise<string> {
    return await this.page.locator("tr[id*='event'] td[class*='title']").first().innerText();
  }

  async filterEventWithOption(eventTitle: string, filterOption: string): Promise<void> {
    await this.page.locator('#event_filter').selectOption({ label: filterOption });
    await this.enterEventTitleFilter(eventTitle);
    await this.page.getByRole('button', { name: 'Filter' }).click();
  }
}
