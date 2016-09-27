describe('RecipesByCategory', () => {

  beforeEach(() => {
    browser.get('/#/recipes/category/middag');
  });

  it('should have middag recipe', () => {
    browser.waitForAngular().then(function() {
      let hasRecipes = element(by.css('.recipeList .recipe' )).isPresent();
      expect(hasRecipes).toBe(true);

      let navnTilForste = element.all(by.css(".recipeList .recipe a")).first().getText();
      expect(navnTilForste).toEqual("Bali kyllinggryte");
    });
  });
  
});
