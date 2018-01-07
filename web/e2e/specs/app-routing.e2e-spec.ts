import { browser, element, by } from 'protractor'

describe('The Routing logic', () => {
  it('should display the /children page as default', () => {
  	browser.get('/');

  	expect(browser.getCurrentUrl()).toMatch(/children$/);
  });

  it('should display page-not-found page if the requested page does not exist', () => {
  	browser.get('/missing-page');

  	expect(element(by.css('p')).getText()).toBe('Page was not found!');
  });
});