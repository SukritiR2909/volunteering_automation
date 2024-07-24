import { Locator, Page } from "playwright/test";
import { BasePage } from "./basePage";

export class BfLandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly lnkLogo: Locator = this.page.locator(".navbar-brand");
  readonly lnkDonations: Locator = this.page.getByRole("link", {
    name: "Donations",
  });

  readonly lnkNavVolunter: Locator = this.page.getByRole('link', {
    name: 'Volunteer', exact: true
});

 readonly lnkMyVolunteer: Locator = this.page.getByRole('link', {
    name: 'My Volunteer'
});

  readonly lnkAdminDashboard: Locator = this.page.getByRole('link', {
    name: 'Icon - gear - outline Admin'
  })

  async clickLogo(): Promise<void> {
    await this.lnkLogo.click();
  }

  async clickDonations(): Promise<void> {
    await this.lnkLogo.click();
    await this.logger.info('Donation clicked')
  }

  async clickNavVolunteer(): Promise<void> {
    await this.lnkNavVolunter.click();
    await this.logger.info('Nav volunteer button clicked')
  }

  async clickMyVolunteer(): Promise<void> {
    await this.lnkMyVolunteer.click();
    await this.logger.info('Clicked on my volunteering')
  }

  async goToAdminDashboard(): Promise<void> {
    await this.lnkAdminDashboard.click();
    await this.logger.info('Navigated to admin dashboard.')
  }
}