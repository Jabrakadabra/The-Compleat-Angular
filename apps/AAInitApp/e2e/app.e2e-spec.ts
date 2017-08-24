import { AAInitAppPage } from './app.po';

describe('aainit-app App', () => {
  let page: AAInitAppPage;

  beforeEach(() => {
    page = new AAInitAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
