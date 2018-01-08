import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildDetailPage {

  childDetailDisplay = element(by.css('#childDetailDisplay'));
  childDetailIdDisplay = this.childDetailDisplay.all(by.css('p')).get(1);
  childDetailNameDisplay = this.childDetailDisplay.all(by.css('p')).get(2);
  childDetailDateOfBirthDisplay = this.childDetailDisplay.all(by.css('p')).get(3);
  goToChildrenPageButton = element(by.css('#goToChildrenPageButton'));

  navigateToPage(childId: number): void {
    browser.get(`/child/${childId}`);
  };
}