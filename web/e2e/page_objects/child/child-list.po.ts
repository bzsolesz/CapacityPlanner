import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildListPage {

  childListDisplay: ElementFinder = element(by.css('#childListDisplay'));
  childListItemDisplays: ElementArrayFinder = this.childListDisplay.all(by.css('li'));

  navigateToPage(): void {
    browser.get('/');
  };
}