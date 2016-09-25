describe('Home', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Mat, drikke og kos';
    expect(subject).toEqual(result);
  });

  it('should have header', () => {
    let header = element(by.css('.siteHeader h1'));
    let subject = header.getText();
    let result  = "Mat, drikke og kos";
    expect(subject).toEqual(result);
  });

  it('should have frontpage image', () => {
    let subject = element(by.css('img.frontpageImage')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });
});
