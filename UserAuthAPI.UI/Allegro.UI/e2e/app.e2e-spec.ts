import { Allegro.UIPage } from './app.po';

describe('allegro.ui App', () => {
  let page: Allegro.UIPage;

  beforeEach(() => {
    page = new Allegro.UIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to allegro!!');
  });
});
