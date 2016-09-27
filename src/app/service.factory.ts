import {RecipeMockService} from "./recipes/recipe.mock.service";
import {RecipeFirebaseService} from "./recipes/recipe.firebase.service";
import {RecipeService} from "./recipes/recipe.service";

export class ServiceFactory {

    static getRecipeService():any {
        if (window["recipeServiceProvider"])
            return RecipeMockService;

        return RecipeFirebaseService;
    }
}

