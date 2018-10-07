import { browser, element, by } from "protractor";
import { NavigationBarPage, WeeklyAttendancePage, ChildListPage } from "../page_objects";

describe("The Routing logic", () => {
  const navigationBarPage: NavigationBarPage = new NavigationBarPage();
  const weeklyAttendancePage: WeeklyAttendancePage = new WeeklyAttendancePage();
  const childListPage: ChildListPage = new ChildListPage();

  it("should display the Child List page as default", () => {
    browser.get("/");

    expect(browser.getCurrentUrl()).toMatch(/child\/all$/);
  });

  it("should display page-not-found page if the requested page does not exist", () => {
    browser.get("/missing-page");

    expect(element(by.css("p")).getText()).toBe("Page was not found!");
  });

  it("should allow toggle between Attendance and Child page", () => {
    browser.get("/");

    navigationBarPage.whenClickOnAttendanceNavigationTab();
    weeklyAttendancePage.thenPageIsDisplayed();

    navigationBarPage.whenClickOnChildNavigationTab();
    childListPage.thenPageIsDisplayed();
  });
});
