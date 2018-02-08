import { ChildListPage } from '../../page_objects/child/child-list.po';
import { ChildDetailPage } from '../../page_objects/child/child-detail.po';

describe('By the Child feature the User', () => {

  it('should be able to see the list of Children', () => {

    var childListPage: ChildListPage = new ChildListPage();

    childListPage.navigateToPage();

    expect(childListPage.childListDisplay.isDisplayed()).toBeTruthy();

    expect(childListPage.childListItemDisplays.count()).toBe(2);
    expect(childListPage.childListItemDisplays.get(0).getText()).toContain('Peter Jones (06/06/1970)');
    expect(childListPage.childListItemDisplays.get(1).getText()).toContain('Mark Spencer (26/02/1981)');
  });

  it('should be able to see the Child details by clicking on the link in the list', () => {

    var childListPage: ChildListPage = new ChildListPage();

    childListPage.navigateToPage();

    childListPage.clickOnChildListItemLink(0);

    var childDetailPage: ChildDetailPage = new ChildDetailPage();

    expect(childDetailPage.childDetailDisplay.isDisplayed()).toBeTruthy();

    expect(childDetailPage.childDetailIdDisplay.getText()).toBe("9");
    expect(childDetailPage.childDetailFirstNameDisplay.getAttribute('value')).toBe('Peter');
    expect(childDetailPage.childDetailSurnameDisplay.getAttribute('value')).toBe('Jones');
    expect(childDetailPage.childDetailDateOfBirthDisplay.getAttribute('value')).toBe('06/06/1970');
  });

  it('should be able to navigate from Child Detail page to Children page', () => {

    var childDetailPage: ChildDetailPage = new ChildDetailPage();

    childDetailPage.navigateToPage(9);

    expect(childDetailPage.childDetailIdDisplay.getText()).toBe("9");

    childDetailPage.goToChildrenPageButton.click();

    var childListPage: ChildListPage = new ChildListPage();

    expect(childListPage.childListItemDisplays.count()).toBe(2);
  });
});