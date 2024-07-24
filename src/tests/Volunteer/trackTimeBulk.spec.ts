import { test } from "../../fixtures";

test.describe("Volunteer Dashboard", async() => {
    test('Track time for group', async ({
        activeAdminPage,
        adminDashboardPage,
        bfLandingPage,
        volunteerMenuPage,
        trackTimeGroup,        
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.goToAdminDashboard();
        await adminDashboardPage.volunteerSetting();

        await bfLandingPage.clickMyVolunteer();
        await volunteerMenuPage.clickTrackTime();
        await trackTimeGroup.trackTimeGrpBulk();
    })
})