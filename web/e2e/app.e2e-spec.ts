import { browser, by, element } from 'protractor';

describe('Capacity Planner Web App Integration Tests', () => {

  const TEST_CHILD_ID: number = 9;

  var childIdInput = element(by.css('#childIdInput'));
  var queryButton = element(by.css('#queryButton'));
  var errorMessageDisplay = element(by.css('#errorMessageDisplay'));
  var childDetailDisplay = element(by.css('#childDetailDisplay'));
  var childDetailDisplayId = childDetailDisplay.all(by.css('p')).get(1);

  beforeEach(() => {
    browser.get('/');
  });

  it('Should find a child by ID and display her details', () => {

    childIdInput.sendKeys(TEST_CHILD_ID);
    queryButton.click();

    expect(errorMessageDisplay.isPresent()).toBeFalsy();
    expect(childDetailDisplay.isPresent()).toBeTruthy();

    expect(childDetailDisplayId.isPresent()).toBeTruthy();
    expect(childDetailDisplayId.getText()).toBe(TEST_CHILD_ID.toString());
  });

  it('should return /not found/ error message for missing child', () => {

    childIdInput.sendKeys(-999);
    queryButton.click();

    expect(errorMessageDisplay.isPresent()).toBeTruthy();
    expect(childDetailDisplay.isPresent()).toBeFalsy();

    expect(errorMessageDisplay.getText()).toMatch(/not found/);
  });
});