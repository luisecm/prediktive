import { test, expect } from "@playwright/test";
import { DuckDuckGoPage } from "../pages/mainPage";

test.describe("DuckDuckGo tests", () => {
  test("Validate results have the word `android` in the title", async ({
    page,
  }) => {
    const duckPage = new DuckDuckGoPage(page);

    await test.step("Navigate to DuckDuckGo", async () => {
      await duckPage.goto();
    });

    await test.step("Search for 'android'", async () => {
      await duckPage.searchFor("android");
    });

    await test.step("Assert search results contain the word `android`", async () => {
      const results = await duckPage.getSearchResultsText();
      for (const title of results) {
        expect(title.toLowerCase()).toContain("android");
      }
    });
  });

  test("Validate Regions modal contains more than 10 items", async ({
    page,
  }) => {
    const duckPage = new DuckDuckGoPage(page);

    await test.step("Navigate to DuckDuckGo", async () => {
      await duckPage.goto();
    });

    await test.step("Search for 'android'", async () => {
      await duckPage.searchFor("android");
    });

    await test.step("Open All Regions modal", async () => {
      await duckPage.openRegionsModal();
    });

    await test.step("Assert that the modal contains more than 10 items", async () => {
      const regionCount = await duckPage.getRegionCount();
      expect(regionCount).toBeGreaterThan(10);
    });
  });

  test("Fetching and printing DuckDuckGo API Icon URL", async ({ request }) => {
    let response: any;
    await test.step("Fetch DuckDuckGo API response", async () => {
      response = await request.get(
        "https://api.duckduckgo.com/?q=android&format=json"
      );
      expect(response.ok()).toBeTruthy();
    });

    await test.step("Extract and print all icon URLs", async () => {
      const response = await request.get(
        "https://api.duckduckgo.com/?q=android&format=json"
      );
      const responseBody = await response.json();

      // Convert JSON to string and extract all Icon.URL occurrences using regex
      const matches =
        JSON.stringify(responseBody).match(/"URL":"(\/i\/[^"]+)"/g) || [];

      // Format and print valid URLs
      const iconUrls = matches.map(
        (match: any) =>
          `https://duckduckgo.com${match.split('":"')[1].replace('"', "")}`
      );

      if (iconUrls.length > 0) {
        console.log("Extracted Icon URLs:");
        iconUrls.forEach((url) => console.log(url));
      } else {
        console.log("No icon URLs found.");
      }
    });
  });
});
