import { Component, Injectable, OnInit } from '@angular/core';

import {ImageService} from "../image.service";
import {FirebaseBeverageConverter} from "./firebase.beverage.converter";
import {FirebaseService} from "../firebase.service";
import {Beverage, BeverageService} from "./";

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
