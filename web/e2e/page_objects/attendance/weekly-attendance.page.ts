import { by, element, ElementFinder } from "protractor";

export class WeeklyAttendancePage {
  private static readonly pageContent: ElementFinder = element(by.css("p"));

  public thenPageIsDisplayed(): void {
    expect(WeeklyAttendancePage.pageContent.getText()).toEqual("Attendance");
  }
}
