import {RecipeMockService} from "./recipes";
import {RecipeFirebaseService} from "./recipes";
import {BeverageFirebaseService} from "./beverages";

export class ServiceFactory {

    static getRecipeService():any {
        if (window["recipeServiceProvider"])
            return RecipeMockService;

        return RecipeFirebaseService;
    }

    static getBeverageService():any {
        if (window["beverageServiceProvider"])
            return RecipeMockService;

        return BeverageFirebaseService;
    }
}

