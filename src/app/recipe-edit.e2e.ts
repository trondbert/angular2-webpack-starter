beforeEach(() => {
});

describe('Recipe-Edit', () => {

    it('should show the recipe', () => {
        browser.get('/#/recipes/edit;key=-JbXOVSHZ1xZTecumGgt');
        browser.sleep(2000);
        var nameText = element(by.css(".inputField")).element(by.css("#name")).getAttribute("value");
        expect(nameText).toMatch(".*kaker");
    });

});


