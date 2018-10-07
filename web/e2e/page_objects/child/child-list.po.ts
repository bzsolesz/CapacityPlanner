import { browser, by, element, ElementFinder, ElementArrayFinder } from "protractor";

export class ChildListPage {

  public readonly mainDisplay: ElementFinder = element(by.css("#childListDisplay"));
  public readonly addChildButton: ElementFinder = element(by.css("#addChildButton"));
  public readonly listItems: ElementArrayFinder = this.mainDisplay.all(by.css("a"));

  public navigateToPage(): void {
    browser.get("/child/all");
  }

  public thenPageIsDisplayed(): void {
    expect(this.mainDisplay.isDisplayed()).toBeTruthy();
  }

  public clickOnChildListItemLink(itemIndex: number): void {
    this.listItems.get(itemIndex).click();
  }
}
