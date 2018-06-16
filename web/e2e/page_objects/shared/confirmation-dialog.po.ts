import { by, element, ElementFinder } from "protractor";

export class ConfirmationDialogPage {
  public readonly okButton: ElementFinder = element(by.css("#okButton"));
}
