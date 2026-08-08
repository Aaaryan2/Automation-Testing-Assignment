class DynamicControlsPage {
  constructor(page) {
    this.page = page;
    this.checkboxContainer = page.locator('#checkbox-example');
    this.checkbox = this.checkboxContainer.locator('input[type="checkbox"]');
    this.checkboxButton = this.checkboxContainer.locator('button');
    this.loadingSpinner = page.locator('#loading');
    this.message = page.locator('#message');
  }

  async goto() {
    await this.page.goto('/dynamic_controls');
  }

  /**
   * Clicking the Enable/Disable button triggers a ~5s async DOM update on this page
   * (a loading spinner appears, then the checkbox's disabled state and #message flip).
   * We explicitly wait on the spinner's lifecycle instead of a hard sleep so the test
   * stays fast when the app is quick and safe when it's slow.
   */
  async toggleCheckbox() {
    await this.checkboxButton.click();
    await this.loadingSpinner.waitFor({ state: 'visible' });
    await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async getMessageText() {
    await this.message.waitFor({ state: 'visible' });
    const text = await this.message.textContent();
    return text ? text.trim() : '';
  }
}

module.exports = { DynamicControlsPage };
