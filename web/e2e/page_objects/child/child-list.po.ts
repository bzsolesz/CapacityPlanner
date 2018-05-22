import { browser, by, element, ElementFinder, ElementArrayFinder } from "protractor";

export class ChildListPage {

  public readonly childListDisplay: ElementFinder = element(by.css("#childListDisplay"));
  public readonly addChildButton: ElementFinder = element(by.css("#addChildButton"));
  public readonly childListItemDisplays: ElementArrayFinder = this.childListDisplay.all(by.css("a"));

  public navigateToPage(): void {
    browser.get("/child/all");
  }

  public clickOnChildListItemLink(itemIndex: number): void {
    this.childListItemDisplays.get(itemIndex).click();
  }
}
