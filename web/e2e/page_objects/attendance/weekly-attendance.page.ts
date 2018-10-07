import { by, element, ElementFinder } from "protractor";

export class WeeklyAttendancePage {
  private static readonly pageContent: ElementFinder = element(by.css(".panel-title"));

  public thenPageIsDisplayed(): void {
    expect(WeeklyAttendancePage.pageContent.getText()).toEqual("Weekly Attendance");
  }
}
