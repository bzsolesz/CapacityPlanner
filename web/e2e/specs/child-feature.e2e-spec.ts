import { ChildListPage } from '../page_objects/child-list.po';
import { ChildDetailPage } from '../page_objects/child-detail.po';

describe('By the Child feature the User', () => {

  it('should be able to see the list of Children', () => {

    var childListPage: ChildListPage = new ChildListPage();

    childListPage.navigateToPage();

    expect(childListPage.childListDisplay.isDisplayed()).toBeTruthy();

    expect(childListPage.childListItemDisplays.count()).toBe(2);
    expect(childListPage.childListItemDisplays.get(0).getText()).toContain('Peter Jones (06/06/1970)');
    expect(childListPage.childListItemDisplays.get(1).getText()).toContain('Mark Spencer (26/02/1981)');
  });

  it('should be able to query a Child by ID and see her details', () => {

    const TEST_CHILD_ID: number = 9;

    var childDetailPage: ChildDetailPage = new ChildDetailPage();

    childDetailPage.navigateToPage();

    childDetailPage.childIdInput.sendKeys(TEST_CHILD_ID);
    childDetailPage.queryButton.click();

    expect(childDetailPage.childDetailDisplay.isPresent()).toBeTruthy();

    expect(childDetailPage.childDetailIdDisplay.getText()).toBe(TEST_CHILD_ID.toString());
    expect(childDetailPage.childDetailNameDisplay.getText()).toBe('Peter Jones');
    expect(childDetailPage.childDetailDateOfBirthDisplay.getText()).toBe('06/06/1970');
  });
});