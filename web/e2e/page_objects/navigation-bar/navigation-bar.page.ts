import { by, element, ElementFinder } from "protractor";

export class NavigationBarPage {
  private static readonly childNavigationTab: ElementFinder = element(by.css("li:nth-of-type(1)"));
  private static readonly attendanceNavigationTab: ElementFinder = element(by.css("li:nth-of-type(2)"));

  public whenClickOnChildNavigationTab(): void {
    NavigationBarPage.childNavigationTab.click();
  }

  public whenClickOnAttendanceNavigationTab(): void {
    NavigationBarPage.attendanceNavigationTab.click();
  }
}
