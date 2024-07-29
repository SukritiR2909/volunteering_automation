import { test } from '../fixtures';

test.describe("Volunteer dashboard", async() => {
    test('Create volunteer event', async({
        userRole,
       
    }) => {
        await userRole.makeAdmin();
    })
})