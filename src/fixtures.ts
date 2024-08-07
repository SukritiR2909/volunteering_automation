import { test as base } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { ActiveAdminPage } from "./pages/activeAdminPage";
import { BfLandingPage } from "./pages/bfLandingPage";
import { VolunteerMenuPage } from "./pages/volunteerMenuPage";
import { CreateEventPage } from "./pages/createEventPage";
import { TrackTimeSelf } from "./pages/trackTimeSelf";
import { TrackTimeGroup } from "./pages/trackTimeGroup";
import { AdminDashboardPage } from "./pages/adminDashboardPage";
import { UserRole } from "./pages/userRole";
import { FindVolunteering } from "./pages/findVolunteer";
import { fi } from "@faker-js/faker";

type pageFixtures =  {
    activeAdminPage: ActiveAdminPage;
    adminDashboardPage: AdminDashboardPage;
    bfLandingPage: BfLandingPage;
    volunteerMenuPage: VolunteerMenuPage;
    createEventPage: CreateEventPage;
    trackTimeSelf: TrackTimeSelf;
    trackTimeGroup: TrackTimeGroup;
    userRole: UserRole;
    findVolunteering: FindVolunteering;
}

export const test = base.extend<pageFixtures>({
     /**
   * Dynamically mapping scripts with test file, and the path after below dir should be same.
   * test file : /tests/
   * data file : /testData/
   * @param param0
   * @param use
   * @param testInfo
   * @returns json data using test title.
   */

     activeAdminPage: async({ page }, use) => {
        const activeAdminPage = new ActiveAdminPage(page);
        await use(activeAdminPage);
     },

     bfLandingPage: async({page}, use) => {
        const bfLandingPage = new BfLandingPage(page);
        await use(bfLandingPage);
     },

     adminDashboardPage: async({page}, use) => {
      const adminDashboardPage = new AdminDashboardPage(page);
      await use(adminDashboardPage);
     }, 

     volunteerMenuPage: async({ page }, use) => {
        const volunteerMenuPage = new VolunteerMenuPage(page);
        await use(volunteerMenuPage);
     },

    createEventPage: async({page}, use) => {
        const createEventPage = new CreateEventPage(page);
        await use(createEventPage);
    },

    trackTimeSelf: async({page}, use) => {
      const trackTimeSelf = new TrackTimeSelf(page);
      await use(trackTimeSelf);
    },

    trackTimeGroup: async({page}, use) => {
      const trackTimeGroup = new TrackTimeGroup(page);
      await use(trackTimeGroup);
    },

    userRole: async({page}, use) => {
      const userRole = new UserRole(page);
      await use(userRole);
    },

    findVolunteering: async({page}, use) => {
      const findVolunteer = new FindVolunteering(page);
      await use(findVolunteer);
    }

})