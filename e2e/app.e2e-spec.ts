import { TimeHakerClientPage } from './app.po';

describe('time-haker-client App', function() {
  let page: TimeHakerClientPage;

  beforeEach(() => {
    page = new TimeHakerClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
