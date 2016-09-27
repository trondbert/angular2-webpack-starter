import {Recipe} from "./recipe";
import {Injectable} from "@angular/core";

export abstract class RecipeService {
    
    abstract deleteRecipe(recipe:Recipe):void;

    abstract getRecipe(key:string, callback):void;

    abstract saveRecipe(recipe:Recipe, callback):void;

    abstract getRecipesByCategory(key:string, callback);

}