import { test } from "../../fixtures";
import { BfLandingPage } from "../../pages/bfLandingPage";
import { FindVolunteering } from "../../pages/findVolunteer";
import { VolunteerMenuPage } from "../../pages/volunteerMenuPage";

test.describe("Volunteer Dashboard", async() => {
    test('Find Volunteer', async ({
        activeAdminPage,
        adminDashboardPage,
        bfLandingPage,
        volunteerMenuPage,
        findVolunteering
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
        await activeAdminPage.adminLogin();
        await bfLandingPage.clickMyVolunteer();
        await volunteerMenuPage.clickFindVolunteer();
        await findVolunteering.noShiftSignUp();
    })
})