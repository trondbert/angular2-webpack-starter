import {RecipeComponent} from "./recipe-component";
import {RecipesListComponent} from "./recipes-list.component";

export class RecipesByCategoryComponent extends RecipesListComponent {

    private sub:any;
    private recipes = [];

    ngOnInit() {
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            thisComp.recipes = [];
            thisComp.getRecipeService().getRecipesByCategory(params['key'], function(recipe) {
                thisComp.recipes.push(recipe);
                thisComp.recipesMap[recipe.key] = recipe;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}