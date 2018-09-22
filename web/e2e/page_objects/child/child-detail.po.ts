import { browser, by, element, ElementFinder } from "protractor";
import { promise } from "selenium-webdriver";

export class ChildDetailPage {

  public readonly mainDisplay: ElementFinder = element(by.css("#childDetailDisplay"));
  public readonly firstNameInput: ElementFinder = this.mainDisplay.element(by.css("#firstName"));
  public readonly surnameInput: ElementFinder = this.mainDisplay.element(by.css("#surname"));
  public readonly dateOfBirthInput: ElementFinder = this.mainDisplay.element(by.css("#dateOfBirth"));
  public readonly datePickerEighthDayOfMonth: ElementFinder = element(by.css("body")).all(by.css("[role=gridcell]")).get(7);
  public readonly mondayAttendance: ElementFinder = element(by.css("app-weekly-attendance app-daily-attendance:nth-of-type(1)"));
  public readonly saveButton: ElementFinder = element(by.css("#saveButton"));
  public readonly deleteButton: ElementFinder = element(by.css("#deleteButton"));
  public readonly goToChildrenPageButton: ElementFinder = element(by.css("#goToChildrenPageButton"));

  // tslint:disable-next-line: no-any
  public navigateToPage(childId: number): promise.Promise<any> {
    return browser.get(`/child/${childId}`);
  }
}
