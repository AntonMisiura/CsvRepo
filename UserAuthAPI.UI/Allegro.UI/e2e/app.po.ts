import { browser, by, element } from 'protractor';

export class Allegro.UIPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('allegro-root h1')).getText();
  }
}
