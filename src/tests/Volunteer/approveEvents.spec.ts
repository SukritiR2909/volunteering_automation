import { test } from "../../fixtures";

test.describe("Volunteer Dashboard", async() => {
    test('Approve Envet', async ({
        activeAdminPage,
        adminDashboardPage,
        bfLandingPage,
       
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.goToAdminDashboard();
        await adminDashboardPage.volunteerEvent();

    })
})