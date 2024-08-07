import { test } from "../../fixtures";

test.describe("Volunteer Dashboard", async() => {
    test('Create event copy', async ({
        activeAdminPage,
        bfLandingPage,
        volunteerMenuPage,
        findVolunteering
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.clickMyVolunteer();
        await volunteerMenuPage.clickFindVolunteer();
        await findVolunteering.makeCopyEvnet();
    })
})