import { Component, Injectable, OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {ImageService} from "../image.service";
import {FirebaseFactory} from "../firebase.factory";
import {RecipeService} from "./recipe.service";

@Injectable()
export class RecipeFirebaseService extends RecipeService {

    constructor(private imageService:ImageService) {
        super();
    }

    static getFirebaseRef(url) {
        return FirebaseFactory.getFirebaseRef(url);
    }

    recipeAdded(data, callback) {
        var recipeFb = data.val();
        if (recipeFb) {
            var recipe = RecipeFirebaseService.recipeFromStorage(data.key, recipeFb);
            callback.call(this, recipe);

            var imgCallback = function (img) {
                recipe.image = img;
            };
            this.imageService.getImage(recipe.imageId, imgCallback);
        }
    }

    getRecipes(fn) {
        var thisService = this;
        var recipesRef = RecipeFirebaseService.getFirebaseRef('recipes/').orderByChild("name");
        recipesRef.on('child_added', function (data) { thisService.recipeAdded(data, fn); });
    }

    getRecipesByCategory(category, callback) {
        var thisService = this;
        var tagList = category.replace(/ø/g, "oe").replace(/æ/g, "ae").replace(/å/g, "aa");
        var tags = tagList.split("&").sort().join("&");
        var recipesRef = RecipeFirebaseService.getFirebaseRef('recipes/').orderByChild("tags_" + tags).equalTo(true);

        recipesRef.on('child_added', function (data) {
            thisService.recipeAdded(data, callback);
        });
    }

    getRecipe(key:string, fn) {
        console.log("DEBUG getRecipe: " + key);
        var recipeRef = RecipeFirebaseService.getFirebaseRef('recipes/' + key);
        var _imageService = this.imageService;
        var _recipeFromStorage = RecipeFirebaseService.recipeFromStorage;

        recipeRef.on('value', function (data) {
            console.log("DEBUG value event");
            var recipeFb = data.val();
            if (recipeFb) {
                var recipe = _recipeFromStorage(data.key, recipeFb);
                console.log("DEBUG found recipe " + data.key);
                fn.call(this, recipe);

                var imgCallback = function (img) {
                    recipe.image = img;
                };
                _imageService.getImage(recipeFb.imageId, imgCallback);
            }
            else
                console.log("DEBUG hero undefined");
        });
    }

    getAllRecipes(callback) {
        var thisService = this;
        var recipesRef = RecipeFirebaseService.getFirebaseRef('recipes/');

        recipesRef.on('child_added', function (data) {
            thisService.recipeAdded(data, callback);
        });
    }

    static recipeFromStorage(key, recipeFb) {
        var recipe:Recipe = new Recipe();
        recipe.dateCreated = recipeFb.dateCreated;
        recipe.dateModified = recipeFb.dateModified;
        recipe.imageId = recipeFb.imageId;
        recipe.instructions = recipeFb.instructions;
        recipe.key = key;
        recipe.name = recipeFb.name;
        recipe.tags = recipeFb.tags;
        recipe.transients = {
            ingredients1: recipeFb.ingredients.split("~*/|")[0] || "",
            ingredients2: recipeFb.ingredients.split("~*/|")[1] || "" };
        return recipe;
    };

    static recipeForStorage(recipe) {
        var forStorage = {
            dateCreated: recipe.dateCreated,
            dateModified: recipe.dateModified,
            imageId: recipe.imageId,
            ingredients: recipe.transients.ingredients1 + "~*/|" + recipe.transients.ingredients2,
            instructions: recipe.instructions || "",
            name: recipe.name || "",
            tags: recipe.tags || "",
        };
        var tagsMap = RecipeFirebaseService.createTagsMap(forStorage.tags);
        for (let tagsKey of Object.keys(tagsMap)) {
            forStorage[tagsKey] = true;
        }
        return forStorage;
    }

    saveRecipe(recipe:Recipe, callback) {
        var thisService = this;
        if (recipe.image) {
            var callbackImg = function(imageKey) {
                recipe.imageId = imageKey;
                thisService.saveRecipeOnly(recipe, callback);
            };
            this.imageService.saveImage(recipe.image, recipe.imageId, callbackImg);
        }
        else {
            this.saveRecipeOnly(recipe, callback);
        }
    }

    saveRecipeOnly(recipe:Recipe, callback) {
        if (recipe.key) {
            var recipesRef = RecipeFirebaseService.getFirebaseRef("recipes/");
            console.log("DEBUG saveRecipeOnly: " + Object.keys(recipesRef));

            //noinspection TypeScriptUnresolvedFunction
            recipesRef.child(recipe.key).set(RecipeFirebaseService.recipeForStorage(recipe));
        }
        else {
            var recipesRef = RecipeFirebaseService.getFirebaseRef("recipes/");
            var recipeRef = recipesRef.push(RecipeFirebaseService.recipeForStorage(recipe));
        }
        callback.call(this, recipe.key);
    }

    deleteRecipe(recipe:Recipe) {
        var recipesRef = RecipeFirebaseService.getFirebaseRef("recipes/");
        recipesRef.child(recipe.key).remove();
    }

    static createTagsMap(tags) {
        var tagsList = RecipeFirebaseService.createTagsList(tags.split(" ").sort(), 0);
        var tagsMap = {};
        for (let tags of tagsList) {
            var tagsNoScandinavian = tags.replace(/ø/g, "oe").replace(/æ/g, "ae").replace(/å/g, "aa");
            tagsMap["tags_" + tagsNoScandinavian] = true;
        }
        if (tagsList)
        return tagsMap;
    }

    static createTagsList(tags, index) {
        if (index == tags.length - 1)
            return [ tags[index] ];

        var tagsList = [ tags[index] ];
        var tailTags = RecipeFirebaseService.createTagsList(tags, index + 1);
        for (let tailTag of tailTags) {
            tagsList.push(tags[index] + "&" + tailTag);
            tagsList.push(tailTag);
        }
        return tagsList.sort();
    }
}
