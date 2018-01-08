import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class ChildListPage {

  childListDisplay: ElementFinder = element(by.css('#childListDisplay'));
  childListItemDisplays: ElementArrayFinder = this.childListDisplay.all(by.css('li'));

  private childListItemLinks: ElementArrayFinder = this.childListDisplay.all(by.css('a'));

  navigateToPage(): void {
    browser.get('/child/all');
  };

  clickOnChildListItemLink(itemIndex: number): void {
    this.childListItemLinks.get(itemIndex).click();
  }
}