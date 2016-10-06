import { Component, Injectable, OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {ImageService} from "../image.service";
import {FirebaseFactory} from "../firebase.factory";
import {RecipeService} from "./recipe.service";
import {FirebaseRecipeConverter} from "./firebase.recipe.converter";
import {FirebaseService} from "../firebase.service";

@Injectable()
export class RecipeFirebaseService extends RecipeService {

    private firebaseService : FirebaseService;

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
    retrieveAll(callback) {
        this.firebaseService.retrieveAll(callback);
    }
    retrieveByCategory(category, callback) {
        this.firebaseService.retrieveByCategory(category, callback);
    }

    save(recipe:Recipe, callback) {
        this.firebaseService.save(recipe, callback);
    }

    remove(recipe:Recipe) {
        var recipesRef = FirebaseFactory.getFirebaseRef("recipes/");
        recipesRef.child(recipe.key).remove();
    }

}
