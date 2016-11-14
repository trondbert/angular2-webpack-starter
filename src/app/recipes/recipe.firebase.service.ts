import { Component, Injectable, OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {ImageService} from "../image.service";
import {FirebaseFactory} from "../firebase.factory";
import {RecipeService} from "./recipe.service";
import {FirebaseRecipeConverter} from "./firebase.recipe.converter";
import {FirebaseService} from "../firebase.service";
import {App} from "../app.component";

@Injectable()
export class RecipeFirebaseService extends RecipeService {

    private logger = App.LOGGER_FACTORY.getLogger("RecipeFirebaseService");

    private firebaseService : FirebaseService;
    private recipesMap : { [key:string]:Recipe[]; } = {};

    constructor(private imageService:ImageService) {
        super();
        this.firebaseService = new FirebaseService(
            "recipes",
            this.imageService,
            new FirebaseRecipeConverter());
    }
    retrieve(key:string, callback):void {
        this.firebaseService.retrieve(key, callback);
    }
    retrieveAll() {
        if (!this.recipesMap["all"]) {
            this.logger.debug("Fetching recipes");
            this.recipesMap["all"] = [];

            var thiz = this;
            this.firebaseService.retrieveAll(function(recipe) {
                    thiz.recipesMap["all"].push(recipe);
                },
                function(recipe) {
                    thiz.firebaseService.removeFromList(thiz.recipesMap["all"], recipe);
                }
            );
        }
        return this.recipesMap["all"];
    }
    retrieveByCategory(tagList) {
        var categoriesKey = tagList.sort().join("&");
        if (!this.recipesMap["byCategory:"+categoriesKey]) {
            this.recipesMap["byCategory:"+categoriesKey] = [];

            var thiz = this;
            this.firebaseService.retrieveByCategory(tagList, function(recipe) {
                thiz.recipesMap["byCategory:"+categoriesKey].push(recipe);
            },
            function(recipe) {
                thiz.firebaseService.removeFromList(
                    thiz.recipesMap["byCategory:"+categoriesKey], recipe);
            }
            );
        }
        return this.recipesMap["byCategory:"+categoriesKey];
    }

    save(recipe:Recipe, callback) {
        this.firebaseService.save(recipe, callback);
    }

    remove(recipe:Recipe) {
        this.firebaseService.remove(recipe);
    }

    disconnect() {
        this.firebaseService.disconnect();
    }

    disconnectRecipe(key) {
        this.firebaseService.disconnectEntity(key);
    }
}
