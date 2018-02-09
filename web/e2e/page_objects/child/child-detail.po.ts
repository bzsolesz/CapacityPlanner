import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildDetailPage {

  childDetailDisplay = element(by.css('#childDetailDisplay'));
  childDetailIdDisplay = this.childDetailDisplay.element(by.css('#id'));
  childDetailFirstNameInput = this.childDetailDisplay.element(by.css('#firstName'));
  childDetailSurnameInput = this.childDetailDisplay.element(by.css('#surname'));
  childDetailDateOfBirthInput = this.childDetailDisplay.element(by.css('#dateOfBirth'));
  childDetailSaveButton = this.childDetailDisplay.element(by.css('#saveButton'));
  goToChildrenPageButton = element(by.css('#goToChildrenPageButton'));

  navigateToPage(childId: number): void {
    browser.get(`/child/${childId}`);
  };
}