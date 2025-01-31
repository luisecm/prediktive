import { Page, Locator, expect } from "@playwright/test";

export class DuckDuckGoPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly allRegionsButton: Locator;
  readonly regionModal: Locator;
  readonly regionItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole("button", {
      name: "Search",
      exact: true,
    });
    this.searchInput = page.locator('input[name="q"]');
    this.searchResults = page.locator("article h2 a");
    this.allRegionsButton = page.getByTestId("region-filter-label");
    this.regionModal = page.getByTestId("dropdown-options").nth(1);
    this.regionItems = this.regionModal.locator("span.fdosLIuRgrWo7SyeqSUb"); // Note: This is not the best locator strategy, if I could have access to the actual page, I would have used a better locator strategy like data-testid
  }

  async goto() {
    await this.page.goto("/");
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async getSearchResultsText() {
    return await this.searchResults.allInnerTexts();
  }

  async openRegionsModal() {
    await this.allRegionsButton.click();
    await expect(this.regionModal).toBeVisible();
  }

  async getRegionCount() {
    return await this.regionItems.count();
  }
}
