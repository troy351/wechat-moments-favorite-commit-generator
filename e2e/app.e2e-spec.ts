import { MomentsPage } from './app.po';

describe('moments App', () => {
  let page: MomentsPage;

  beforeEach(() => {
    page = new MomentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
