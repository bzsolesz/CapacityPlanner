import { browser } from "protractor";
import { ChildDetailPage, ChildListPage, ConfirmationDialogPage } from "../../page_objects";

describe("By the Child feature the User", () => {

  // tslint:disable-next-line: no-any
  const ngApimock: any = browser["ngApimock"];
  const childListPage: ChildListPage = new ChildListPage();
  const childDetailPage: ChildDetailPage = new ChildDetailPage();
  const confirmationDialogPage: ConfirmationDialogPage = new ConfirmationDialogPage();

  beforeEach(() => {
    ngApimock.setAllScenariosToDefault();
  });

  it("should be able to see the list of Children", () => {
    childListPage.navigateToPage();

    expect(childListPage.mainDisplay.isDisplayed()).toBeTruthy();

    expect(childListPage.listItems.count()).toBe(2);
    expect(childListPage.listItems.get(0).getText()).toContain("Peter Jones (06/04/2018)");
    expect(childListPage.listItems.get(1).getText()).toContain("Mark Spencer (26/02/1981)");
  });

  it("should be able to see the Child details by clicking on the link in the list", () => {
    childListPage.navigateToPage();

    childListPage.clickOnChildListItemLink(0);

    expect(childDetailPage.mainDisplay.isDisplayed()).toBeTruthy();

    expect(childDetailPage.firstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.surnameInput.getAttribute("value")).toBe("Jones");
    expect(childDetailPage.dateOfBirthInput.getAttribute("value")).toBe("06/04/2018");
    expect(childDetailPage.mondayAttendanceFromSelect.getAttribute("ng-reflect-model")).toContain("08:30");
    expect(childDetailPage.mondayAttendanceToSelect.getAttribute("ng-reflect-model")).toContain("18:30");
  });

  it("should be able to update a Child", () => {
    ngApimock.echoRequest("updateChild_9", true);

    childDetailPage.navigateToPage(9).then(() => {
      ngApimock.selectScenario("getChild_9", "updated");
      ngApimock.selectScenario("getChild_All", "updatedChild_9");
    });

    expect(childDetailPage.firstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.dateOfBirthInput.getAttribute("value")).toBe("06/04/2018");

    childDetailPage.firstNameInput.sendKeys(" Updated");
    childDetailPage.dateOfBirthInput.click();
    childDetailPage.datePickerEighthDayOfMonth.click();
    childDetailPage.mondayAttendanceFrom0930.click();
    childDetailPage.mondayAttendanceTo1730.click();

    childDetailPage.saveButton.click();

    childListPage.navigateToPage();

    expect(childListPage.listItems.get(0).getText()).toContain("Peter Updated Jones (08/04/2018)");
  });

  it("should be able to navigate from Child Detail page to Children page", () => {
    childDetailPage.navigateToPage(9);

    expect(childDetailPage.firstNameInput.getAttribute("value")).toBe("Peter");
    expect(childDetailPage.surnameInput.getAttribute("value")).toBe("Jones");

    childDetailPage.goToChildrenPageButton.click();

    expect(childListPage.listItems.count()).toBe(2);
  });

  it("should be able to add a Child", () => {
    ngApimock.echoRequest("addNewChild", true);

    childListPage.navigateToPage();

    childListPage.addChildButton.click().then(() => {
      ngApimock.selectScenario("getChild_All", "newChildAdded");
    });

    expect(childDetailPage.firstNameInput.getAttribute("value")).toBe("");
    expect(childDetailPage.surnameInput.getAttribute("value")).toBe("");
    expect(childDetailPage.dateOfBirthInput.getAttribute("value")).toBe("");

    childDetailPage.firstNameInput.sendKeys("New");
    childDetailPage.surnameInput.sendKeys("Child");
    childDetailPage.dateOfBirthInput.click();
    childDetailPage.datePickerEighthDayOfMonth.click();
    childDetailPage.mondayAttendanceFrom0930.click();
    childDetailPage.mondayAttendanceTo1730.click();

    childDetailPage.saveButton.click();

    expect(childDetailPage.firstNameInput.getAttribute("value")).toBe("New");
    expect(childDetailPage.surnameInput.getAttribute("value")).toBe("Child");
    expect(childDetailPage.dateOfBirthInput.getAttribute("value")).toBe("08/03/1999");

    childDetailPage.goToChildrenPageButton.click();

    expect(childListPage.listItems.get(2).getText()).toContain("New Child (08/03/1999)");
  });

  it("should be able to delete a Child", () => {
    ngApimock.echoRequest("deleteChild_9", true);

    childListPage.navigateToPage();

    expect(childListPage.listItems.count()).toBe(2);
    expect(childListPage.listItems.get(0).getText()).toContain("Peter Jones (06/04/2018)");

    childDetailPage.navigateToPage(9);
    childDetailPage.deleteButton.click();

    confirmationDialogPage.okButton.click().then(() => {
      ngApimock.selectScenario("getChild_All", "childDeleted");
    });

    expect(childListPage.listItems.count()).toBe(1);
    expect(childListPage.listItems.get(0).getText()).toContain("Mark Spencer (26/02/1981)");
  });
});
