import { browser } from "protractor";

import { ChildListPage } from "../../page_objects/child/child-list.po";
import { ChildDetailPage } from "../../page_objects/child/child-detail.po";

describe("By the Child feature the User", () => {

  // tslint:disable-next-line: no-any
  const ngApimock: any = browser["ngApimock"];
  const childListPage: ChildListPage = new ChildListPage();
  const childDetailPage: ChildDetailPage = new ChildDetailPage();

  beforeEach(() => {
    ngApimock.setAllScenariosToDefault();
  });

  it("should be able to see the list of Children", () => {
    childListPage.navigateToPage();

    expect(childListPage.childListDisplay.isDisplayed()).toBeTruthy();

    expect(childListPage.childListItemDisplays.count()).toBe(2);
    expect(childListPage.childListItemDisplays.get(0).getText()).toContain("Peter Jones (06/04/2018)");
    expect(childListPage.childListItemDisplays.get(1).getText()).toContain("Mark Spencer (26/02/1981)");
  });

  it("should be able to see the Child details by clicking on the link in the list", () => {
    childListPage.navigateToPage();

    childListPage.clickOnChildListItemLink(0);

    expect(childDetailPage.childDetailDisplay.isDisplayed()).toBeTruthy();

    expect(childDetailPage.childDetailFirstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.childDetailSurnameInput.getAttribute("value")).toBe("Jones");
    expect(childDetailPage.childDetailDateOfBirthInput.getAttribute("value")).toBe("06/04/2018");
  });

  it("should be able to update a Child", () => {
    childDetailPage.navigateToPage(9).then(() => {
      ngApimock.selectScenario("getChild_9", "updated");
      ngApimock.selectScenario("getChild_All", "updatedChild_9");
    });

    expect(childDetailPage.childDetailFirstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.childDetailDateOfBirthInput.getAttribute("value")).toBe("06/04/2018");

    childDetailPage.childDetailFirstNameInput.sendKeys(" Updated");
    childDetailPage.childDetailDateOfBirthInput.click();
    childDetailPage.childDetailDatePickerEighthDayOfMonth.click();

    childDetailPage.childDetailSaveButton.click();

    childListPage.navigateToPage();

    expect(childListPage.childListItemDisplays.get(0).getText()).toContain("Peter Updated Jones (08/04/2018)");
  });

  it("should be able to navigate from Child Detail page to Children page", () => {
    childDetailPage.navigateToPage(9);

    expect(childDetailPage.childDetailFirstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.childDetailSurnameInput.getAttribute("value")).toBe("Jones");

    childDetailPage.goToChildrenPageButton.click();

    expect(childListPage.childListItemDisplays.count()).toBe(2);
  });

  it("should be able to add a Child", () => {
    childListPage.navigateToPage();

    childListPage.addChildButton.click().then(() => {
      ngApimock.selectScenario("getChild_All", "newChildAdded");
    });

    expect(childDetailPage.childDetailFirstNameInput.getAttribute("value")).toBe("");
    expect(childDetailPage.childDetailSurnameInput.getAttribute("value")).toBe("");
    expect(childDetailPage.childDetailDateOfBirthInput.getAttribute("value")).toBe("");

    childDetailPage.childDetailFirstNameInput.sendKeys("New");
    childDetailPage.childDetailSurnameInput.sendKeys("Child");
    childDetailPage.childDetailDateOfBirthInput.click();
    childDetailPage.childDetailDatePickerEighthDayOfMonth.click();

    childDetailPage.childDetailSaveButton.click();

    expect(childDetailPage.childDetailFirstNameInput.getAttribute("value")).toBe("New");
    expect(childDetailPage.childDetailSurnameInput.getAttribute("value")).toBe("Child");
    expect(childDetailPage.childDetailDateOfBirthInput.getAttribute("value")).toBe("08/03/1999");

    childDetailPage.goToChildrenPageButton.click();

    expect(childListPage.childListItemDisplays.get(2).getText()).toContain("New Child (08/03/1999)");
  });
});
