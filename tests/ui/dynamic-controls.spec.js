const { test, expect } = require('@playwright/test');
const { DynamicControlsPage } = require('../../pages/DynamicControlsPage');

test.describe('Dynamic Controls - Checkbox enable/disable', () => {
  test('checkbox toggles disabled/enabled state after the async DOM update completes', async ({ page }) => {
    const dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();

    await expect(dynamicControlsPage.checkbox).toBeEnabled();

    // Disable
    await dynamicControlsPage.toggleCheckbox();
    expect(await dynamicControlsPage.getMessageText()).toContain("It's gone!");
    await expect(dynamicControlsPage.checkbox).toBeDisabled();

    // Re-enable
    await dynamicControlsPage.toggleCheckbox();
    expect(await dynamicControlsPage.getMessageText()).toContain("It's enabled");
    await expect(dynamicControlsPage.checkbox).toBeEnabled();
  });
});
