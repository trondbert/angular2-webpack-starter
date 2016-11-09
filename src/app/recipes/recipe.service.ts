import {Recipe} from "./recipe";
import {Injectable} from "@angular/core";
import {StorageService} from "../storage.service";

export abstract class RecipeService extends StorageService {
    
    abstract remove(recipe:Recipe):void;

    abstract retrieve(key:string, callback):void;

    abstract save(recipe:Recipe, callback):void;

    abstract retrieveByCategory(key:string, callback);

    abstract retrieveAll(callback);

    abstract disconnect();
}