beforeEach(() => {
});

describe('Recipe-Edit', () => {

    it('should show the recipe', () => {
        browser.get('/#/recipes/edit;key=-JbXOVSHZ1xZTecumGgt');
        browser.waitForAngular().then(function () {
            var nameText = element(by.css(".inputField")).element(by.css("#name")).getAttribute("value");
            expect(nameText).toMatch(".*kaker");
        });
    });

    it ('should update the recipe', () => {
        browser.get('/#/recipes/edit;key=-JbXOVSHZ1xZTecumGgt');
        browser.waitForAngular().then(function () {
            browser.pause();
            var nameField = element(by.css(".inputField")).element(by.css("#name"));
            var newName = "name"+ Math.random();
            nameField.sendKeys(newName);
        });
    });
});


