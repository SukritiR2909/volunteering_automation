import { expect } from "@playwright/test"
import { test } from '../../fixtures';

test.describe("Volunteer dashboard", async() => {
    test('Create volunteer event', async({
        activeAdminPage,
        adminDashboardPage,
        bfLandingPage,
        volunteerMenuPage,
        createEventPage
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.goToAdminDashboard();
        await adminDashboardPage.volunteerSetting();
        await bfLandingPage.clickMyVolunteer();
        await volunteerMenuPage.clickEvent();
        await createEventPage.createEvent();
    })
})