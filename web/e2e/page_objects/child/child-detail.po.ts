import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildDetailPage {

  childIdInput = element(by.css('#childIdInput'));
  queryButton = element(by.css('#queryButton'));
  childDetailDisplay = element(by.css('#childDetailDisplay'));
  childDetailIdDisplay = this.childDetailDisplay.all(by.css('p')).get(1);
  childDetailNameDisplay = this.childDetailDisplay.all(by.css('p')).get(2);
  childDetailDateOfBirthDisplay = this.childDetailDisplay.all(by.css('p')).get(3);

  navigateToPage(): void {
  	browser.get('/child');
  }
}