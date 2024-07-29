import { Locator, Page  } from "@playwright/test";
import { BasePage } from "./basePage";

export class UserRole extends BasePage {
    pageURL: string = "users/a_a/hack";
    constructor(page: Page) {
        super(page);
    }

    readonly lnkUser: Locator = this.page.getByRole('heading', {name: 'Users'}).getByRole('link');
    readonly txtEmail: Locator = this.page.getByLabel('Email');
    readonly btnFilter: Locator = this.page.getByRole('button', {name: 'Filter'});
    readonly btnEdit: Locator = this.page.getByRole('link', { name: 'Edit', exact: true});

    //===========> Role toggels <============//
    readonly toggleBillingDaas: Locator = this.page.getByLabel('Admin::Billing::DaasFiles');
    readonly toggleBillingInvoiceRecipient: Locator = this.page.getByLabel('Admin::Billing::InvoiceRecipient');
    readonly toggleBillingInvoice: Locator = this.page.getByLabel('Admin::Billing::Invoices');
    readonly toggleBillingOverview: Locator = this.page.getByLabel('Admin::Billing::Overview');
    readonly togglePiiShow: Locator = this.page.getByLabel('Admin::Pii::Show');
    readonly togglePmAdp: Locator = this.page.getByLabel('Admin::ProgramManagement::Adp');
    readonly togglePmCampaigns: Locator = this.page.getByLabel('Admin::ProgramManagement::Campaigns');
    readonly togglePmCompanyAdmin: Locator = this.page.getByLabel('Admin::ProgramManagement::CompanyAdmin');
    readonly togglePmCreditGrant: Locator = this.page.getByLabel('Admin::ProgramManagement::CreditGrant');
    readonly togglePmEmail: Locator = this.page.getByLabel('Admin::ProgramManagement::Emails');
    readonly togglePmErgs: Locator = this.page.getByLabel('Admin::ProgramManagement::Ergs');
    readonly togglePmFeaturedFunds: Locator = this.page.getByLabel('Admin::ProgramManagement::FeaturedFunds');
    readonly togglePmGrant: Locator = this.page.getByLabel('Admin::ProgramManagement::Grants');
    readonly togglePmIncludeList: Locator = this.page.getByLabel('Admin::ProgramManagement::IncludeList');
    readonly togglePmPayroll: Locator = this.page.getByLabel('Admin::ProgramManagement::Payroll');
    readonly togglePmPeople: Locator = this.page.getByLabel('Admin::ProgramManagement::People');
    readonly togglePmRequest: Locator = this.page.getByLabel('Admin::ProgramManagement::Requests');
    readonly togglePmSecureUpload: Locator = this.page.getByLabel('Admin::ProgramManagement::SecureUploads');
    readonly togglePmUKG: Locator = this.page.getByLabel('Admin::ProgramManagement::UKG');
    readonly togglePmVolunteerSurvey: Locator = this.page. getByLabel('Admin::ProgramManagement::VolunteerSurvey');
    readonly toggleReportingAllocation: Locator = this.page.getByLabel('Admin::Reporting::Allocations');
    readonly toggleReportingCredits: Locator = this.page.getByLabel('Admin::Reporting::Credits');
    readonly toggleReportingDonation: Locator = this.page.getByLabel('Admin::Reporting::Donations');
    readonly toggleReportingFraudDetection: Locator = this.page.getByLabel('Admin::Reporting::FraudDetection');
    readonly toggleReportingFunds: Locator = this.page.getByLabel('Admin::Reporting::Funds');
    readonly toggleReportingOrganization: Locator = this.page.getByLabel('Admin::Reporting::Organizations');
    readonly toggleReportingOverview: Locator = this.page.getByLabel('Admin::Reporting::Overview');
    readonly toggleReportingVolunteerEvent: Locator = this.page.getByLabel('Admin::Reporting::VolunteerEvent');
    readonly toggleReportingVolunteerTime: Locator = this.page.getByLabel('Admin::Reporting::VolunteerTimes');
    readonly toggleSettingsBrnading: Locator = this.page.getByLabel('Admin::Settings::Branding');
    readonly toggleSettingsDevSetting: Locator = this.page.getByLabel('Admin::Settings::DeveloperSettings');
    readonly toggleSettingsLoginSetting: Locator = this.page.getByLabel('Admin::Settings::LoginSettings');
    readonly toggleSettingsMatching: Locator = this.page.getByLabel('Admin::Settings::Matching');
    readonly toggleSettingsPrograms: Locator = this.page.getByLabel('Admin::Settings::Programs');
    readonly toggleSettingsVolunteering: Locator = this.page.getByLabel('Admin::Settings::Volunteering');

    //----> Update button <----//
    readonly btnUpdate: Locator = this.page.getByRole('button', {name: 'Update User'});
    

    async SearchUser(): Promise<void> {
        await this.page.goto('https://brightfunds.brightfundsstaging.com/users/a_a/hack');
        await this.lnkUser.click();
        await this.txtEmail.click();
        await this.txtEmail.fill('1085125@brightfunds.org');
        await this.btnFilter.click();
    }

    async makeAdmin(): Promise<void> {
        await this.page.goto('https://brightfunds.brightfundsstaging.com/users/a_a/hack');
        await this.lnkUser.click();
        await this.txtEmail.click();
        await this.txtEmail.fill('553759@brightfunds.org');
        await this.btnFilter.click();
        await this.btnEdit.click();

        //----> enable toggles<------//
        await this.toggleBillingDaas.click();
        await this.toggleBillingInvoice.click();
        await this.toggleBillingInvoiceRecipient.click();
        await this.toggleBillingOverview.click();
        await this.togglePiiShow.click();
        await this.togglePmAdp.click();
        await this.togglePmCampaigns.click();
        await this.togglePmCompanyAdmin.click();
        await this.togglePmCreditGrant.click();
        await this.togglePmEmail.click();
        await this.togglePmErgs.click();
        await this.togglePmFeaturedFunds.click();
        await this.togglePmGrant.click();
        await this.togglePmIncludeList.click();
        await this.togglePmPayroll.click();
        await this.togglePmPeople.click();
        await this.togglePmRequest.click();
        await this.togglePmSecureUpload.click();
        await this.togglePmUKG.click();
        await this.togglePmVolunteerSurvey.click();
        await this.toggleReportingAllocation.click();
        await this.toggleReportingCredits.click();
        await this.toggleReportingDonation.click();
        await this.toggleReportingFraudDetection.click();
        await this.toggleReportingFunds.click();
        await this.toggleReportingOrganization.click();
        await this.toggleReportingOverview.click();
        await this.toggleReportingVolunteerEvent.click();
        await this.toggleReportingVolunteerTime.click();
        await this.toggleSettingsBrnading.click();
        await this.toggleSettingsDevSetting.click();
        await this.toggleSettingsLoginSetting.click();
        await this.toggleSettingsMatching.click();
        await this.toggleSettingsPrograms.click();
        await this.toggleSettingsVolunteering.click();
    
        //-------->update the user <----------//
        await this.btnUpdate.click();
    }
}