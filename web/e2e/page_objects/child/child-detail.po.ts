import { browser, by, element, ElementFinder } from "protractor";
import { promise } from "selenium-webdriver";

export class ChildDetailPage {

  public readonly childDetailDisplay: ElementFinder = element(by.css("#childDetailDisplay"));
  public readonly childDetailFirstNameInput: ElementFinder = this.childDetailDisplay.element(by.css("#firstName"));
  public readonly childDetailSurnameInput: ElementFinder = this.childDetailDisplay.element(by.css("#surname"));
  public readonly childDetailDateOfBirthInput: ElementFinder = this.childDetailDisplay.element(by.css("#dateOfBirth"));
  public readonly childDetailDatePickerEighthDayOfMonth: ElementFinder = element(by.css("body")).all(by.css("[role=gridcell]")).get(7);
  public readonly childDetailSaveButton: ElementFinder = element(by.css("#saveButton"));
  public readonly childDetailDeleteButton: ElementFinder = element(by.css("#deleteButton"));
  public readonly goToChildrenPageButton: ElementFinder = element(by.css("#goToChildrenPageButton"));

  // tslint:disable-next-line: no-any
  public navigateToPage(childId: number): promise.Promise<any> {
    return browser.get(`/child/${childId}`);
  }
}
