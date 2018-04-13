import { browser, element, by } from "protractor";

describe("The Routing logic", () => {
  it("should display the Child List page as default", () => {
    browser.get("/");

    expect(browser.getCurrentUrl()).toMatch(/child\/all$/);
  });

  it("should display page-not-found page if the requested page does not exist", () => {
    browser.get("/missing-page");

    expect(element(by.css("p")).getText()).toBe("Page was not found!");
  });
});
