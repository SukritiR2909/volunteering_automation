import { expect } from "@playwright/test"
import { test } from '../../fixtures';

test.describe("Volunteer dashboard", async() => {
    test('Create volunteer event', async({
        activeAdminPage,
       
    }) => {
        await activeAdminPage.goToActiveAdmin();
        await activeAdminPage.volunteerSettings();
    })
})