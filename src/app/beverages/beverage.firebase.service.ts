import { Injectable } from '@angular/core';

import {ImageService} from "../image.service";
import {FirebaseBeverageConverter} from "./firebase.beverage.converter";
import {FirebaseService} from "../firebase.service";
import {Beverage, BeverageService} from "./";

@Injectable()
export class BeverageFirebaseService extends BeverageService {

    private firebaseService : FirebaseService;
    private beveragesMap : { [key:string]:Beverage[]; } = {};

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
    retrieveAll() : Beverage[] {
        if (!this.beveragesMap["all"]) {
            this.beveragesMap["all"] = [];

            var thiz = this;
            this.firebaseService.retrieveAll(function (beverage) {
                    thiz.beveragesMap["all"].push(beverage);
                },
                function(beverage) {
                    thiz.firebaseService.removeFromList(thiz.beveragesMap["all"], beverage);
                }
            );
        }
        return this.beveragesMap["all"];
    }
    save(beverage:Beverage, callback) {
        this.firebaseService.save(beverage, callback);
    }
    remove(beverage:Beverage) {
        this.firebaseService.remove(beverage);
    }
    disconnect() {}

    disconnectBeverage(key) {
        this.firebaseService.disconnectEntity(key);
    }
}
