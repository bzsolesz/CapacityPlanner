import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildDetailPage {

  childDetailDisplay = element(by.css('#childDetailDisplay'));
  childDetailIdDisplay = this.childDetailDisplay.element(by.css('#id'));
  childDetailFirstNameDisplay = this.childDetailDisplay.element(by.css('#firstName'));
  childDetailSurnameDisplay = this.childDetailDisplay.element(by.css('#surname'));
  childDetailDateOfBirthDisplay = this.childDetailDisplay.element(by.css('#dateOfBirth'));
  goToChildrenPageButton = element(by.css('#goToChildrenPageButton'));

  navigateToPage(childId: number): void {
    browser.get(`/child/${childId}`);
  };
}