import { Component, Injectable, OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {ImageService} from "../image.service";
import {FirebaseFactory} from "../firebase.factory";
import {RecipeService} from "./recipe.service";
import {FirebaseService} from "./firebase.service";
import {FirebaseRecipeConverter} from "./firebase.recipe.converter";
import {Entity} from "../entity";
import {Beverage} from "./beverage";
import {BeverageService} from "./beverage.service";
import {FirebaseBeverageConverter} from "./firebase.beverage.converter";

@Injectable()
export class BeverageFirebaseService extends BeverageService {

    private firebaseService : FirebaseService;

    constructor(private imageService:ImageService) {
        super();
        this.firebaseService = new FirebaseService(
            "beverages",
            this.imageService,
            new FirebaseBeverageConverter());
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

    save(beverage:Beverage, callback) {
        this.firebaseService.save(beverage, callback);
    }

    remove(beverage:Beverage) {
        this.firebaseService.remove(beverage);
    }
}
