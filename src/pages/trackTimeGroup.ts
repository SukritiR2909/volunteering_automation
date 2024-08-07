import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from '@faker-js/faker';
import { promises as fs } from 'fs';
import * as path from 'path';


interface TrackTimeForm {
    trackDescription: string;
}

function getPreviousDayDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  async function generateCSV(filePath: string, entries: { email: string; hours: number; designation: string; privacy: string; category: string; }[]): Promise<void> {
    const previousDayDate = getPreviousDayDate();
    const csvHeader = `Email,Hours,Date - mm/dd/yy,Designation Text,Privacy,Category\n`;
    const csvContent = entries.map(entry => `${entry.email},${entry.hours},${previousDayDate},${entry.designation},${entry.privacy},${entry.category}\n`).join('');
    await fs.writeFile(filePath, csvHeader + csvContent, 'utf8');
}




export class TrackTimeGroup extends BasePage {
    constructor(page: Page){
        super(page);
    }

    //===============> Locators <================//

    readonly lnkTrackTimeGroup: Locator = this.page.locator("[href*='volunteering/group_events/new']");
    readonly txtOrganization: Locator = this.page.getByPlaceholder('Search nonprofit name or EIN');
    readonly radioNonProfit: Locator = this.page.getByText('Nonprofit');
    readonly radioSchool: Locator = this.page.getByText('Schools');
    readonly btnSearch: Locator = this.page.locator('#edit-field a').first();
    readonly btnSelectOrg: Locator = this.page.locator('#organization-331694').getByRole('link', { name: 'Select' });

    readonly cardTrackTime: Locator = this.page.getByText('ForhoursSpickler');
    readonly txtDate: Locator = this.page.getByPlaceholder('Date');
    readonly txtHours: Locator = this.page.locator('#volunteering_group_event_hour_estimation');
    readonly txtSelfHour: Locator = this.page.locator('#volunteering_group_time_hours');

    readonly txtAddPeople: Locator = this.page.getByPlaceholder('Add volunteers');

    readonly lnkDownloadTemplate: Locator = this.page.getByRole('link', {name: 'Download import template'});
    readonly btnBulkUpload: Locator = this.page.locator('#volunteering_group_event_bulk_hour_imports_attributes_0_import_file');

    readonly txtDescription: Locator = this.page.locator('#volunteering_group_event_description');
    readonly txtAddress: Locator = this.page.getByPlaceholder('Enter an address');
    readonly checkRemote: Locator = this.page.getByText('This was a remote activity');

      //volunteering opportunity type radios
      readonly radioOpp1: Locator = this.page.getByText('Running activity: Running');
      readonly radioOpp2: Locator = this.page.getByText('Cooking activity: cooking');
      readonly radioOpp3: Locator = this.page.getByText('Giving activity: Givign');
          
      
      readonly dropCauseArea: Locator = this.page.locator('#volunteering_group_event_volunteering_cause_area_id');

      readonly checkMatching: Locator = this.page.getByText('Submit these hours for a');
      readonly radioKeepPrivate: Locator = this.page.getByText('Keep my information private:');
      readonly radioShareName: Locator = this.page.getByText('Share my name only: Share my');
      readonly radioNameEmail: Locator = this.page.getByText('Share my name and email:')
  
      readonly checkDesignation: Locator = this.page.getByText('Include a designation for a');

      readonly btnTrackTime: Locator = this.page.getByRole('button', {
        name: 'Track this time'
    });

     readonly btnReviewImport: Locator = this.page.getByRole('link', {name: 'Review imported volunteers'});
     readonly btnImportAttendees: Locator = this.page.getByRole('button', {name: 'Import attendees'});
     readonly btnCalcleImport: Locator = this.page.getByRole('button', {name: 'Cancle'});

    

     async jsClickSelector(selector: string, page: Page) {
        await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          if (element) {
            const event = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            element.dispatchEvent(event);
          }
        }, selector);
      }
    


    //===================> Track time group  <======================//

    async trackTimeGroup(): Promise<TrackTimeForm> {
        const today = new Date();
        const todayDate = today.getDate().toString();

      //random cause area picker
      const options = ['286', '287', '288', '289'];
      const randomIndex = Math.floor(Math.random() * options.length);
     const randomOption = options[randomIndex];


        let data: TrackTimeForm = {
            trackDescription: `Auto Group - ${faker.lorem.paragraph()}`,    
        }
        await this.lnkTrackTimeGroup.waitFor();
        await this.lnkTrackTimeGroup.click();
        await this.txtOrganization.click();
        await this.txtOrganization.fill('Yams');
        await this.txtOrganization.press('Enter');
        await this.page.locator('#organization-467184').getByRole('link', { name: 'Select' }).click();
        await this.txtDate.click();
        await this.page.locator(`.ui-state-default >> text="${todayDate}"`).click();
        await this.logger.info('Date entered');
        await this.txtHours.fill('4');
        await this.logger.info('Hours entered');
        await this.txtAddPeople.click();
        await this.txtAddPeople.fill('Lestrange');
        await this.page.locator('li').filter({ hasText: 'Lestrange Cabe (1081968@' }).click();
        await this.txtAddPeople.press('Tab');
        // await this.txtAddPeople.click();
        // await this.txtAddPeople.clear();
        // await this.txtAddPeople.fill('kathryn');
        // await this.page.locator('li').filter({ hasText: 'Kathryn Contratto (831382@' }).click();
        
        // await this.cardTrackTime.click();
        await this.txtDescription.click();
        await this.txtDescription.fill(data.trackDescription);
        await this.logger.info('Description entered');
        await this.txtDescription.press('Tab');
        // await this.cardTrackTime.click();
        await this.checkRemote.click();
        await this.radioOpp1.click();
        await this.dropCauseArea.selectOption(randomOption);

        await this.btnTrackTime.click();
        await this.logger.info('Hours tracked for group');



        return data;

    }





    //=======================> Track time with csv <===================//


    
      
    async trackTimeGrpBulk(): Promise<TrackTimeForm> {
        const today = new Date();
        const todayDate = today.getDate().toString();

      //random cause area picker
      const options = ['286', '287', '288', '289'];
       const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex];


        let data: TrackTimeForm = {
            trackDescription: `Auto Group - ${faker.lorem.paragraph()}`,    
        }

        await this.lnkTrackTimeGroup.waitFor();
        await this.lnkTrackTimeGroup.click();
        await this.txtOrganization.click();
        await this.txtOrganization.fill('Yams');
        await this.txtOrganization.press('Enter');
        await this.page.locator('#organization-467184').getByRole('link', { name: 'Select' }).click();
        await this.txtDate.click();
        await this.page.locator(`.ui-state-default >> text="${todayDate}"`).click();
        await this.logger.info('Date entered');
        await this.txtHours.fill('4');
        await this.logger.info('Hours entered');
        await this.txtAddPeople.click();
        await this.txtAddPeople.fill('Raspo');
        await this.page.locator('li').filter({ hasText: 'Raspotnik Spoor (831384@' }).click();
        // await this.txtAddPeople.click();
        // await this.txtAddPeople.fill('kathryn');
        // await this.page.locator('li').filter({ hasText: 'Kathryn Contratto (831382@' }).click();

        await this.page.getByText('Bold Italic Strikethrough Link Heading Quote Code Bullets Numbers Decrease').click();
        await this.lnkDownloadTemplate.click();

        // Path to your CSV file
        const filePath = path.join(__dirname, 'Auto-bulk.csv');

            // Sample data for multiple entries
            const entries = [
                { email: '1093078@gwkinvest.com', hours: 8, designation: 'Auto - For specific reason', privacy: 'none', category: 'Running activity' },
                { email: '1086321@gwkinvest.com', hours: 6, designation: 'Auto - For water cooler', privacy: 'name', category: 'Running activity' },
                { email: '1081968@gwkinvest.com', hours: 5, designation: 'Auto - Use this money for children', privacy: 'email', category: 'Running activity' },
                { email: '1081967@gwkinvest.com', hours: 8, designation: 'Auto - Use this money for food', privacy: 'none', category: 'Cooking activity' },
                { email: '1074169@gwkinvest.com', hours: 6, designation: 'Auto - Use this moeny for cloths', privacy: 'name', category: 'Cooking activity' },
                { email: '1074168@gwkinvest.com', hours: 5, designation: 'Auto - For development', privacy: 'email', category: 'Cooking activity' },
                { email: '1072524@gwkinvest.com', hours: 8, designation: 'Auto - For progress', privacy: 'none', category: 'Giving activity' },
                { email: '1071735@gwkinvest.com', hours: 6, designation: 'Auto - For different reasons', privacy: 'name', category: 'Giving activity' },
                { email: '1058273@gwkinvest.com', hours: 5, designation: 'Auto - For nature', privacy: 'email', category: 'Giving activity' },
                { email: '1049860@gwkinvest.com', hours: 8, designation: 'Auto - For devlopment', privacy: 'none', category: 'Recycling' },

            ];

        // Generate the CSV file with multiple entries
        await generateCSV(filePath, entries);

        // Upload the CSV file
        await this.btnBulkUpload.setInputFiles(filePath);
             
        await this.txtDescription.fill(data.trackDescription);
        await this.logger.info('Description entered');
        await this.txtDescription.press('Tab');

        await this.checkRemote.click();
        await this.radioOpp3.click();
        await this.dropCauseArea.selectOption(randomOption);

        await this.btnTrackTime.click();
        await this.logger.info('Hours tracked for group');

        await this.btnReviewImport.waitFor({ state: 'visible' });
        // await this.page.waitForFunction(() => !document.querySelector('button[name="Review imported volunteers"]').disabled);
        await this.btnReviewImport.click();

        await this.btnImportAttendees.click();

        return data;
    }

}