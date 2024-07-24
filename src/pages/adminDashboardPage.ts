import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdminDashboardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly lnkReporting: Locator = this.page.getByRole('link', {name: 'Reporting'});
    readonly lnkProgramManagement: Locator = this.page.getByRole('link', {name: 'Program Management'});
    readonly lnkSettings: Locator = this.page.getByRole('link', {name: 'Settings'});
    readonly lnkBilling: Locator = this.page.getByRole('link', {name: 'Billing'});

    // reporting page
    readonly lnkOverview: Locator = this.page.locator('#reporting-subnav').getByRole('link', {
        name: 'Overview'
    });

    readonly lnkOrganization: Locator = this.page.getByRole('link', {
        name: 'Organizations'
    });
    readonly lnkFunds: Locator = this.page.getByRole('link', {name: 'Funds'});
    readonly lnkDonations: Locator = this.page.getByRole('link', {
        name: 'Donations',
        exact: true
    });
    readonly lnkAllocations: Locator = this.page.getByRole('link', {
        name: 'Allocations'
    });
    readonly lnkCredits: Locator = this.page.getByRole('link', {
        name: 'Credits'
    })

    readonly lnkVolunteerEvents: Locator = this.page.getByRole('link', {
        name: 'Volunteer Events'
    })

    readonly lnkVolunteer:  Locator = this.page.getByRole('link', {
        name: 'Volunteering'
    })

    readonly lnkBrightGift:  Locator = this.page.getByRole('link', {
        name: 'Bright Funds'
    })
    //bright funds drop down
    readonly lnkGiftPurchased:  Locator = this.page.getByRole('link', {
        name: 'Gift Purchased'
    })
    readonly lnkGiftCreditReports:  Locator = this.page.getByRole('link', {
        name: 'Gift Credit Reports'
    })

    readonly lnkEverydayAction:  Locator = this.page.getByRole('link', {
        name: 'Everyday Action'
    }) 
    //Everyday action dropdown
    readonly lnkEmployeeActivities:  Locator = this.page.getByRole('link', {
        name: 'Employees\' Activities'
    })
    readonly lnkEmployeeEverydayAction: Locator = this.page.getByRole('link', {
        name: 'Employees\' Everyday Actions'
    })



    //===========> Settings <==============//


    readonly btnVolunteering: Locator = this.page.getByRole('link', {name: 'Volunteering'});
    readonly checkVolunteerMatch: Locator = this.page.getByText('Yes, enable volunteer hour');

    async enableVolunteerMatch() {
        const enableMatch = await this.checkVolunteerMatch.isChecked();
        if(!enableMatch){
            await this.checkVolunteerMatch.click();
        }
    }
    readonly txtMinimumHour: Locator = this.page.locator('#matching_rule_min_value');
    readonly txtMatchPerHour: Locator = this.page.getByLabel('How much would you like to');
    readonly btnSave: Locator = this.page.getByRole('button', {name: 'Save'});
    readonly bfLogo: Locator = this.page.locator('div').filter({ hasText: /^Toggle navigationMenu$/ }).getByRole('link');


    async volunteerSetting(): Promise<void> {

        await this.lnkSettings.click();
        await this.btnVolunteering.click();
        this.enableVolunteerMatch();
        await this.txtMinimumHour.fill('2');
        await this.txtMatchPerHour.fill('100');
        await this.btnSave.click();
        await this.bfLogo.click();

    }

    //=============> Program management <=============//
    readonly dropdownRequests: Locator = this.page.getByRole('link', {name: 'Requests'});
    readonly lnkVolunteerHour: Locator = this.page.getByRole('link', {name: 'Volunteer Hours'});
    readonly lnkVolunteerEvent: Locator = this.page.getByRole('link', {name: 'Volunteer Events'});
    readonly lnkDonationMatch: Locator = this.page.getByRole('link', {name: 'Donation Matches'});

    //====> Approve volunteer hours <=====

    readonly checkHourApprove: Locator = this.page.getByText('Select All');
    readonly btnApproveHour: Locator = this.page.getByRole('button', {name: 'Approve'});

    async volunteerHour(): Promise<void> {
        await this.lnkProgramManagement.click();
        await this.logger.info('program management was clicked');
        await this.dropdownRequests.click();
        await this.logger.info('Request dropdown clicked');
        await this.lnkVolunteerHour.click();
        await this.logger.info('Volunteer hour clicked')
        await this.checkHourApprove.click();
        await this.btnApproveHour.click();
        await this.logger.info('Hours approved');

    }

    //====> Approve volunteer event <=====
    readonly checkEventApprove: Locator = this.page.getByText('Select All');
    readonly btnApproveEvent: Locator = this.page.getByRole('button', {name: 'Approve'});

    async volunteerEvent(): Promise<void> {
        await this.lnkProgramManagement.click();
        await this.logger.info('program management was clicked');
        await this.dropdownRequests.click();
        await this.logger.info('Request dropdown clicked');
        await this.lnkVolunteerEvent.click();
        await this.logger.info('Volunteer hour clicked')
        await this.checkEventApprove.click();
        await this.btnApproveEvent.click();
        await this.logger.info('Event approved');

    }
}