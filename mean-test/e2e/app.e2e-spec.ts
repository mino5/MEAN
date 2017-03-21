import { MeanTestPage } from './app.po';

describe('mean-test App', function() {
  let page: MeanTestPage;

  beforeEach(() => {
    page = new MeanTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
