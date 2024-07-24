import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { faker } from "@faker-js/faker";


export class ActiveAdminPage extends BasePage {
    pageURL: string = "users/a_a/hack";
    adminURL: string = 'https://gwandk.brightfundsstaging.com/users/1093078@gwkinvest.com/hack';
    employeeURL: string = 'https://gwandk.brightfundsstaging.com/users/1081968@gwkinvest.com/hack';
    constructor(page: Page){
        super(page);
    }
    readonly lnkUser: Locator = this.page.getByRole('heading', {name: 'Users'}).getByRole('link');
    readonly txtCompanyName: Locator = this.page.getByLabel('Company name cont');
    readonly txtFirstName: Locator = this.page.getByLabel('First name');
    readonly btnFilter: Locator = this.page.getByRole('button', {name: 'Filter'});

    readonly btnViewUser: Locator = this.page.getByRole('link', {name: 'View'});
    readonly btnProxy: Locator = this.page.getByRole('link', {name: 'Proxy as user'});


    readonly lnkCompany: Locator = this.page.getByRole('heading', {name: 'Companies'}).getByRole('link');
    

    //volunteering settings

    readonly btnEnterprize: Locator = this.page.getByRole('link', {name: 'Enterprise', exact: true});
    readonly btnConfig: Locator = this.page.getByRole('link', {name: 'Configurations', exact: true});
    readonly dropdownCompany: Locator = this.page.getByLabel('Company', {exact: true});
    readonly btnCompanyFilter: Locator = this.page.getByRole('button', {name: 'Filter'});
    readonly btnEditCompany: Locator = this.page.getByRole('link', {name: 'Edit', exact: true});
    readonly toggleNewUI: Locator = this.page.getByLabel('Enable new volunteering ui');
    readonly btnUpdateConfig: Locator = this.page.getByRole('button', {name: 'Update Configuration'});

    async newVolunteerUI() {
        const isChecked = this.toggleNewUI.isChecked();
        if(!isChecked){
            this.toggleNewUI.click();
        }
    }
    async goToActiveAdmin(): Promise<void> {
        await this.page.goto(this.pageURL);
        await this.logger.info('Navigating to Active admin page')
    }



    async clickUser(): Promise<void> {
        await this.lnkUser.click();
        await this.page.waitForTimeout(500);
        await this.logger.info('Clicked on link - User');
    }


    async goToDashboard(): Promise<void> {
        await this.clickUser();
        await this.txtCompanyName.click();
        await this.txtCompanyName.fill('Wizehive');
        await this.txtFirstName.click();
        await this.txtFirstName.fill('Bridgmon');
        
        await this.btnFilter.click();
        await this.btnViewUser.click();
        await this.btnProxy.click();
        await this.logger.info('Logged in into BF platform')
        
    }


    async clickCompany(): Promise<void> {
        await this.lnkCompany.click();
        await this.logger.info('Clicked on link - Company');
    }

    async adminLogin(): Promise<void> {
        await this.page.goto(this.adminURL);
    }

    async employeeLogin(): Promise<void> {
        await this.page.goto(this.employeeURL);
    }

    async volunteerSettings(): Promise<void> {
        await this.btnEnterprize.click();
        await this.btnConfig.click();
        await this.dropdownCompany.selectOption('971');
        await this.btnFilter.click();
        await this.btnEditCompany.click();
        this.newVolunteerUI();
        await this.btnUpdateConfig.click();
    }
}