import {Recipe} from "./recipe";
import {Injectable} from "@angular/core";

export abstract class RecipeService {
    
    abstract remove(recipe:Recipe):void;

    abstract retrieve(key:string, callback):void;

    abstract save(recipe:Recipe, callback):void;

    abstract retrieveByCategory(key:string);

    abstract retrieveAll() : Recipe[];

    abstract disconnect();

    abstract disconnectRecipe(key);
}