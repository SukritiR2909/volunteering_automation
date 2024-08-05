import { Locator, Page } from "@playwright/test";
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

    //===========> Role toggles <============//
    readonly toggles: Locator[] = [
        this.page.getByLabel('Admin::Billing::DaasFiles'),
        this.page.getByLabel('Admin::Billing::InvoiceRecipient'),
        this.page.getByLabel('Admin::Billing::Invoices'),
        this.page.getByLabel('Admin::Billing::Overview'),
        this.page.getByLabel('Admin::Pii::Show'),
        this.page.getByLabel('Admin::ProgramManagement::Adp'),
        this.page.getByLabel('Admin::ProgramManagement::Campaigns'),
        this.page.getByLabel('Admin::ProgramManagement::CompanyAdmin'),
        this.page.getByLabel('Admin::ProgramManagement::CreditGrant'),
        this.page.getByLabel('Admin::ProgramManagement::Emails'),
        this.page.getByLabel('Admin::ProgramManagement::Ergs'),
        this.page.getByLabel('Admin::ProgramManagement::FeaturedFunds'),
        this.page.getByLabel('Admin::ProgramManagement::Grants'),
        this.page.getByLabel('Admin::ProgramManagement::IncludeList'),
        this.page.getByLabel('Admin::ProgramManagement::Payroll'),
        this.page.getByLabel('Admin::ProgramManagement::People'),
        this.page.getByLabel('Admin::ProgramManagement::Requests'),
        this.page.getByLabel('Admin::ProgramManagement::SecureUploads'),
        this.page.getByLabel('Admin::ProgramManagement::UKG'),
        this.page.getByLabel('Admin::ProgramManagement::VolunteerSurvey'),
        this.page.getByLabel('Admin::Reporting::Allocations'),
        this.page.getByLabel('Admin::Reporting::Credits'),
        this.page.getByLabel('Admin::Reporting::Donations'),
        this.page.getByLabel('Admin::Reporting::FraudDetection'),
        this.page.getByLabel('Admin::Reporting::Funds'),
        this.page.getByLabel('Admin::Reporting::Organizations'),
        this.page.getByLabel('Admin::Reporting::Overview'),
        this.page.getByLabel('Admin::Reporting::VolunteerEvent'),
        this.page.getByLabel('Admin::Reporting::VolunteerTimes'),
        this.page.getByLabel('Admin::Settings::Branding'),
        this.page.getByLabel('Admin::Settings::DeveloperSettings'),
        this.page.getByLabel('Admin::Settings::LoginSettings'),
        this.page.getByLabel('Admin::Settings::Matching'),
        this.page.getByLabel('Admin::Settings::Programs'),
        this.page.getByLabel('Admin::Settings::Volunteering')
    ];

    //----> Update button <----//
    readonly btnUpdate: Locator = this.page.getByRole('button', {name: 'Update User'});
    
    async SearchUser(): Promise<void> {
        await this.page.goto('https://brightfunds.brightfundsstaging.com/users/a_a/hack');
        await this.lnkUser.click();
        await this.txtEmail.click();
        await this.txtEmail.fill('1098831@tempus.com');
        await this.btnFilter.click();
    }

    async makeAdmin(): Promise<void> {
        await this.page.goto('https://brightfunds.brightfundsstaging.com/users/a_a/hack');
        await this.lnkUser.click();
        await this.txtEmail.click();
        await this.txtEmail.fill('1099211@gwkinvest.com');
        await this.btnFilter.click();
        await this.btnEdit.click();

        //----> enable toggles if they are not enabled <------//
        for (const toggle of this.toggles) {
            if (!(await toggle.isChecked())) {
                await toggle.click();
            }
        }
    
        //-------->update the user <----------//
        await this.btnUpdate.click();
    }
}
