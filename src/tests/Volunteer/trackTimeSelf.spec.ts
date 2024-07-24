import { test } from '../../fixtures';

test.describe("Volunteer Dashboard", async() => {
    test.setTimeout(60000);


    test('Track time for self', async({
        activeAdminPage,
        adminDashboardPage,
        bfLandingPage,
        volunteerMenuPage,
        trackTimeSelf
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.goToAdminDashboard();
        await adminDashboardPage.volunteerSetting();

        await bfLandingPage.clickMyVolunteer();
        await volunteerMenuPage.clickTrackTime();
        await trackTimeSelf.trackTimeSelf();
    })
})